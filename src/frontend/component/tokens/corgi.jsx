import React, {Component} from 'react';
// import './corgi.css';

export default class Tokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      corgis: [],
      newCorgiName: "",
      loggedIn: false
    }
    this.getCorgis = this.getCorgis.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignIn = this.requestSignIn.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
  }

  componentWillMount() {
    // This is where we get into trouble with global vars
    // TODO: add sane state management and dependency injection
    // This is more dependable than using the async 
    let loggedIn = window.walletAccount.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.signedOutFlow();
    }
  }

  signedOutFlow() {
    this.setState({
      loggedIn:false,
      loaded: true
    });
  }

  async signedInFlow() {
    const accountId = await this.props.wallet.getAccountId();
    this.getCorgis(accountId).then(res => {
      this.setState({
        loggedIn: true
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
    })
  }

  async checkLoggedIn() {
    await this.props.wallet.isSignedIn();
  }

  async requestSignIn() {
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      window.nearConfig.appName
    )
  }

  requestSignOut() {
    this.props.wallet.signOut();
    this.signedOutFlow();
  }

  getCorgis(owner) {
    return this.props.contract.getCorgisByOwner({ owner: owner });
  }

  getCorgi(tokenId) {
    return this.props.contract.getCorgi({ tokenId: tokenId })
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  randomInt() {
    return Math.floor(Math.random() * 10000000) + 1;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loaded:false });
    this.props.contract.createRandomCorgi({
      name: this.state.newCorgiName,
      seed: this.randomInt()
    }).then(res => {
      // set the returned corgi to display in the frontend
      let corgi = res.lastResult;
      this.setState(state => {
        let corgis = state.corgis.concat(corgi);
        return {
          newCorgiName: "",
          loaded: true,
          corgis:corgis
        }
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.state.loaded && this.state.loggedIn) {
      return (
        <div>
          <Button action={this.requestSignOut} description="Sign out" />
          <p>
            <input 
              id="newCorgiName"
              type="text"
              placeholder="Corgi name"
              onChange={this.handleChange}
              value={this.state.newCorgiName} />
            <button onClick={this.handleSubmit}>Create Corgi!</button>
          </p>
          {this.state.corgis.length > 0 ? 
            <ul>
              <CorgiComponents 
                trigger={this.signedInFlow} 
                contract={this.props.contract} 
                corgis={this.state.corgis} />
            </ul>
          : ""}
        </div>
      )
    } else if (this.state.loaded) {
      return (
        <Button action={this.requestSignIn} description="Please Log In" />
      )
    } else {
      return ("Loading...");
    }
  }
}

function CorgiComponents(props) {
  return props.corgis.map(corgi => {
    return (
      <li key={corgi.dna}>
        <Corgi 
          trigger={props.trigger}
          contract={props.contract}
          dna={corgi.dna}
          name={corgi.name}
          color={corgi.color} />
      </li>
    )
  })
}

function Button(props) {
  return(
    <button onClick={props.action}>{props.description}</button>
  )
}

class TransferCorgi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: "",
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.transferCorgi = this.transferCorgi.bind(this);
  }

  transferCorgi(e) {
    e.preventDefault();
    this.setState({loading: true});
    console.log(this.props.corgiDNA, this.state.recipient);
    this.props.contract.transfer({
      to: this.state.recipient,
      tokenId: this.props.corgiDNA})
    .then(res => {
      this.props.trigger();
      this.setState({loading: false});
    }).catch(err => {
      console.log(err);
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  render() {
    return (
      <div>
        {!this.state.loading ?
          <React.Fragment>
            <input id="recipient"
              type="text"
              placeholder="Corgi recipient"
              onChange={this.handleChange}
              value={this.state.recipient} />
            <Button action={this.transferCorgi} description="Transfer" />
          </React.Fragment>
        : "Loading..."}
      </div>
    )
  }
}

class Corgi extends Component {
  render () {
    let specificColor = { 
      backgroundColor: this.props.color 
    };
    return (
      <div className="wrapper">
        <div className="resize" id="corgi_wrap">
          <div className="corgi_head_area">
            <div className="fuwa corgi_face_area">
              <div style={specificColor} className="corgi_face_before"></div>
              <div className="corgi_face white">
                <div style={specificColor} className="corgi_face_after"></div>
                <div className="eye-left"></div>
                <div className="eye-right"></div>
                <div className="corgi_nose white">
                  <div className="nose"></div>
                </div>
                <div style={specificColor} className="ear-left brown"></div>
                <div style={specificColor} className="ear-right brown"></div>
              </div>
            </div>
            <div className="corgi_breast white">
            </div>
            <div style={specificColor} className="leg_fr_left brown"></div>
            <div style={specificColor} className="leg_fr_right brown"></div>
          </div>
          <div className="corgi_body_area">
            <div style={specificColor} className="corgi_body brown"></div>
          </div>
          <div className="corgi_tail_area">
            <div style={specificColor} className="corgi_hip brown" id="hip">
              <div style={specificColor} className="corgi_hip_after"></div>
              <div style={specificColor} className="leg_ba_left brown"></div>
              <div style={specificColor} className="leg_ba_right brown"></div>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="note">Drag for length</div>
        <div>
          <TransferCorgi
            trigger={this.props.trigger}
            contract={this.props.contract}
            corgiDNA={this.props.dna}
            handleChange={this.handleChange} />
        </div>
        <div className="note">{this.props.name}</div>
      </div>
    )
  }
}