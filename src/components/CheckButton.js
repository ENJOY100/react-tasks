import React, { Component } from 'react';
import '../assets/core_blocks/CheckButton.css';

class CheckButton extends Component {
    render() {
        //let clickEvent;
        //if (this.props.showDone) clickEvent = this.props.showDone;
        return (
            <label className="check-button">
                <input className="check-button__checkbox" type="checkbox" onClick={(event) => this.props.showDone(event)}/>
                <span className="check-button__text">
                    { this.props.text }
                </span>
            </label>
        )
    }
}

export default CheckButton;