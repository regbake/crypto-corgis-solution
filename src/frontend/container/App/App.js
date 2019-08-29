// import 'babel-polyfill';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
let randomColor = require('randomcolor');
let generate = require('project-name-generator');

import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/footer';
import Home from '../../component/home/home';
import Generation from '../../component/Generation/generation';
import Account from '../../component/Account/account';
import Profile from '../../component/Profile/profile';
import Single from '../../component/Single/single';
import Animation from '../../component/Generation/animation/animation'

import './App.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loggedIn: false,
            backDrop: false,
            back: false,
            corgis: [],
            accountId: '',
            color: randomColor(),
            backgroundColor: randomColor(),
            newCorgiName: generate({ words: 2, alliterative: true }).spaced,
            dna: '',
            quoteSum: null
        }
        this.signedInFlow = this.signedInFlow.bind(this);
        this.requestSignIn = this.requestSignIn.bind(this);
    }

    componentDidMount() {
        fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
            headers: {
                Accept: "application/json",
            }
        }).then(response => response.json())
            .then((responseData) => {
                this.setState({
                    quoteSum: responseData.quotes,
                });
            }).catch(error => this.setState({ error }));
        let loggedIn = window.walletAccount.isSignedIn();
        if (loggedIn) {
            this.signedInFlow();
        } else {
            this.signedOutFlow();
        }
    }

    signedOutFlow = () => {
        this.setState({
            loggedIn: false,
            loaded: true,
        });
        return <Redirect to="/" />
    }

    getCorgis = (owner) => {
        return this.props.contract.getCorgis({ owner: owner });
    }

    async signedInFlow() {
        const accountId = await this.props.wallet.getAccountId();
        this.getCorgis(accountId).then(res => {
            this.setState({
                loggedIn: true,
                accountId
            });
            if (res == null || res.corgis.length < 1 || res.corgis == null) {
                this.setState({
                    loaded: true
                });
            } else {
                this.setState({
                    corgis: res.corgis,
                    loaded: true
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }

    async requestSignIn() {
        const appTitle = 'NEAR Corgi';
        await this.props.wallet.requestSignIn(
            window.nearConfig.contractName,
            appTitle
        )
    }

    requestSignOut = () => {
        this.setState({ loaded: false })
        this.props.wallet.signOut();
        setTimeout(this.signedOutFlow, 2000);
    }

    generateQuote = () => {
        const QuoteSum = this.state.quoteSum;
        let randomNumber = Math.floor((Math.random() * QuoteSum.length) + 1);
        let Q = QuoteSum[randomNumber].quote;
        return Q;
    }

    handleChange = ({ name, value }) => {
        this.setState({
            [name]: value
        })
    }

    backdropShowHandler = () => {
        this.setState({ backDrop: true })
    }

    backdropCancelHandler = () => {
        this.setState({ backDrop: false })
    }

    backShowHandler = () => {
        this.setState({ back: true })
    }

    backCancelHandler = () => {
        this.setState({ back: false })
    }

    render() {
        let { loggedIn, loaded, corgis, accountId, color, backgroundColor, newCorgiName, backDrop, back, dna } = this.state
        let { contract } = this.props
        return (
            <div className="App">
                <Header
                    login={loggedIn}
                    load={loaded}
                    requestSignIn={this.requestSignIn}
                    requestSignOut={this.requestSignOut}
                    accountId={accountId}
                    length={corgis.length}
                    handleChange={this.handleChange} />
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => <Home
                            login={loggedIn}
                            load={loaded}
                            requestSignIn={this.requestSignIn}
                            accountId={accountId}
                            length={corgis.length} />}
                    />
                    <Route
                        exact
                        path="/generation"
                        render={() => <Generation
                            login={loggedIn}
                            load={loaded}
                            handleChange={this.handleChange}
                            color={color}
                            backgroundColor={backgroundColor}
                            newCorgiName={newCorgiName}
                        />} />
                    <Route
                        exact
                        path="/account"
                        render={() => <Account
                            load={loaded}
                            login={loggedIn}
                            corgis={corgis}
                        />} />
                    <Route
                        exact
                        path="/profile"
                        render={() => <Profile
                            load={loaded}
                            login={loggedIn}
                            corgis={corgis}
                            contract={contract}
                            handleChange={this.handleChange} />} />
                    <Route
                        exact
                        path="/corgi/:name"
                        render={() => <Single
                            load={loaded}
                            login={loggedIn}
                            contract={contract}
                            corgis={corgis}
                            backDrop={backDrop}
                            backDrop={backDrop}
                            back={back}
                            backdropShowHandler={this.backdropShowHandler}
                            backdropCancelHandler={this.backdropCancelHandler}
                            backShowHandler={this.backShowHandler}
                            backCancelHandler={this.backCancelHandler}
                            handleChange={this.handleChange}
                            accountId={accountId}
                        />} />
                    <Route
                        exact
                        path="/generating"
                        render={() => <Animation
                            load={loaded}
                            login={loggedIn}
                            color={color}
                            backgroundColor={backgroundColor}
                            newCorgiName={newCorgiName}
                            generateQuote={this.generateQuote}
                            handleChange={this.handleChange}
                            corgis={corgis}
                            contract={contract}
                            dna={dna}
                        />} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default withRouter(App)

