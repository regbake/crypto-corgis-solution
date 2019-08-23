import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
let generate = require('project-name-generator');
import { GiGreekSphinx } from "react-icons/gi";

import ColorPicker from '../colorpicker/colorpicker';
import Button from '../../common/Button/Button'

import './info.css'
class Info extends Component {
    state = {
        Name: `${this.props.newCorgiName}`
    }

    handleRandomName = (e) => {
        e.preventDefault()
        let name = generate({ words: 2, alliterative: true }).spaced
        this.setState({ Name: name })
        this.props.handleChange({ name: "newCorgiName", value: name })
    }

    handleNameChange = (event) => {
        let value = event.target.value;
        this.setState({ Name: value })
        this.props.handleChange({ name: "newCorgiName", value })
    }

    handleSubmit = (e) => {
        let { handleChange, history } = this.props
        e.preventDefault()
        handleChange({ name: "newCorgiName", value: this.state.Name })
        history.push("/generating")
    }

    render() {
        let {color, backgroundColor, handleChange} = this.props
        return (
            <div className="inputboard">
                <p className="title">My Corgi is called</p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            className="inputname"
                            name="Name"
                            type="text"
                            placeholder="Corgi name"
                            onChange={this.handleNameChange}
                            value={this.state.Name}
                            required />
                        <span><GiGreekSphinx
                            onClick={() => this.handleRandomName(event)}
                            style={{
                                marginLeft: "8px",
                                color: "#a51cea",
                                fontSize: "2rem",
                                borderRadius: "50%",
                                boxShadow: "0 0 4px 4px rgba(0, 0, 0, 0.5), inset 0 0 5px 2px #ffffff",
                                background: "#f5ebff",
                                cursor: "pointer"
                            }} /></span>
                    </div>
                    <p className="title">Colors</p>
                    <ColorPicker
                        color={color}
                        handleChange={handleChange}
                        backgroundColor={backgroundColor} />
                    <Button description="Generate Corgi" />
                </form>
                <p className="quote">This will create a one-of-a-kind Corgi that will develop a unique size and
                    thought process. The size it grows to will untimately determine it’s value
                </p>
            </div>
        )
    }
}

export default withRouter(Info)
