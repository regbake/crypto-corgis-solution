import React, { Component } from 'react';
let randomColor = require('randomcolor');
let generate = require('project-name-generator');
import { NavLink, Redirect, withRouter } from 'react-router-dom';

import Button from '../../common/Button/Button'


import './nav.css'

class Nav extends Component {
    componentDidMount() {
        if (!this.props.login) { return <Redirect push to="/" /> }
    }
    switchToProfile = () => {
        this.props.history.push("/profile")
    }

    InfoChangeHandler = () => {
        this.props.handleChange({name:"color", value: randomColor()})
        this.props.handleChange({name:"backgroundColor", value: randomColor()})
        this.props.handleChange({name:"newCorgiName", value: generate({ words: 2, alliterative: true }).spaced})
    }

    render() {
        let { accountName, number, requestSignOut } = this.props
        let des = "My Corgis (" + number + ")"
        return (
            <div className="wrap">
                <div className="account">
                    <NavLink to="/account" ><Button description={des} /></NavLink>
                    <Card accountName={accountName} requestSignOut={requestSignOut} switchToProfile={this.switchToProfile} />
                </div>
                <NavLink to="/generation"><AddCorgi InfoChangeHandler={this.InfoChangeHandler}/></NavLink>
            </div>
        )
    }
}

export default withRouter(Nav)

const Card = ({ accountName, requestSignOut, switchToProfile }) => {
    let style = {
        textDecoration: "none",
        display: "block",
        padding: "auto",
        color: "#01c9fd",
        margin: "2%  auto",
        cursor: "alias"
    }
    let name = "@" + accountName + "▾"
    return (
        <div className="dropdown">
            <button className="menutop">{name}</button>
            <div className="dropdown-content">
                <ul style={{textAlign:"center", padding:"2px",marginBottom: "0"}}>
                    <li style={style}><button onClick={switchToProfile}>Edit Profile</button></li>
                    <li style={style}><button onClick={requestSignOut}>Sign Out</button></li>
                </ul>
            </div>
        </div>
    )
}

const AddCorgi = ({InfoChangeHandler}) => (
    <div style={{ boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)", borderRadius: "50%" }} onClick={InfoChangeHandler}>
        <svg width="40px" height="40px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="create" transform="translate(-1047.000000, -1249.000000)" fillRule="nonzero">
                    <g id="icon-addcorgi" transform="translate(1047.000000, 1249.000000)">
                        <path d="M51.6647219,26.1677 C51.6647219,40.4343875 40.0991906,51.9999188 25.8325031,51.9999188 C11.5654094,51.9999188 -0.000121875,40.4343875 -0.000121875,26.1677 C-0.000121875,11.9006063 11.5654094,0.33548125 25.8325031,0.33548125 C40.0991906,0.33548125 51.6647219,11.9006063 51.6647219,26.1677" id="Fill-1" fill="#FBB040"></path>
                        <path d="M48.8554625,37.8789125 C46.74865,30.7358187 44.576025,23.8771 42.301025,21.3916625 C43.350775,18.7754125 42.6658375,15.1626313 42.5439625,14.577225 C43.0554312,13.056225 43.51815,10.1885063 43.3454937,7.381725 C43.1972125,4.96006875 42.5163375,1.82869375 40.1149937,0.66235 C39.3260562,0.27885 38.5448375,0.2325375 37.7936812,0.52381875 C35.5158375,1.4090375 34.0257125,5.1660375 32.937775,7.90944375 C32.609525,8.73819375 32.3255562,9.45319375 32.0883062,9.9021 C31.00565,11.9524438 30.0830562,11.7379437 30.081025,11.7379437 C29.9749937,11.7034125 29.8592125,11.7371313 29.7877125,11.82285 C29.7174312,11.9085688 29.7048375,12.0288188 29.75765,12.1263188 C30.0152125,12.6008188 29.9489937,13.0834438 29.8194,13.4458188 C29.25715,13.4567875 28.6571187,13.4844125 28.0258062,13.5136625 C26.125775,13.6010063 23.9746812,13.699725 21.5119937,13.4381 C21.4384625,13.3686313 21.3555875,13.2922563 21.2654,13.2085687 L21.1878062,13.1366625 C20.2436812,12.2607875 18.2798687,10.4387563 17.5494312,8.55944375 C16.6516187,6.2482875 14.3274625,2.54775625 11.9740562,1.55569375 C11.2119312,1.23475625 10.4940875,1.213225 9.840025,1.49150625 C6.89186875,2.74600625 7.3870875,9.80906875 7.40943125,10.1092875 C7.4098375,10.1170063 7.41065,10.124725 7.412275,10.1324438 C7.56868125,11.1005375 7.67430625,12.6211313 7.41999375,12.9692875 C7.33955625,13.078975 7.353775,13.2325375 7.4520875,13.3263813 C7.45899375,13.3332875 8.15205625,14.0121313 8.42749375,15.3889125 C8.49086875,15.7037563 8.48274375,16.250975 8.4742125,16.8851313 C8.449025,18.6612563 8.41205625,21.3152875 9.89893125,22.7591 C9.46749375,23.6715375 9.235525,24.2658813 9.2249625,24.2922875 C9.20424375,24.3455063 9.20099375,24.4040063 9.2152125,24.4592563 C9.238775,24.5502563 9.77461875,26.702975 7.90180625,27.2579125 C7.77180625,27.2965063 7.69055625,27.4236625 7.71005625,27.557725 C7.72915,27.690975 7.8437125,27.7905062 7.97899375,27.7905062 C8.3945875,27.7913188 9.56580625,27.9079125 9.98018125,28.4331938 C10.1268375,28.6192563 10.1658375,28.8455375 10.0992125,29.1254437 C9.2794,32.569225 9.011275,35.0611625 9.30174375,36.5321938 C9.32286875,36.6386313 9.40574375,36.7223187 9.511775,36.7450688 C9.61861875,36.7678188 9.7279,36.7255688 9.79086875,36.6366 C9.9594625,36.3989438 10.4051187,35.9256625 10.69965,35.9845687 C10.8979,36.0235688 11.0823375,36.3469437 11.2046187,36.8718188 C11.31065,37.3243813 11.3423375,37.8110688 11.2996812,38.3180688 C11.1518062,40.0499125 11.0193687,44.7425063 13.2829937,48.7465062 C16.9993687,50.81635 21.276775,51.9997563 25.8324625,51.9997563 C35.8814625,51.9997563 44.58415,46.2578188 48.8554625,37.8789125" id="Fill-4" fill="#24272A"></path>
                        <polygon id="+" fill="#FFFFFF" points="35.198 29.244 28.97 29.244 28.97 35.58 23.03 35.58 23.03 29.244 16.802 29.244 16.802 23.592 23.03 23.592 23.03 17.22 28.97 17.22 28.97 23.592 35.198 23.592"></polygon>
                    </g>
                </g>
            </g>
        </svg>
    </div >
)