import React, { Component } from 'react';
import '../assets/core_blocks/CheckButton.css';

class CheckButton extends Component {
    render() {
        //let onClick;
        //if (this.props.showDone) onClick = this.props.showDone;
        return (
            <div className="check-button" onClick={(event) => this.props.showDone(event)}>
                <label className="check-button__label">
                    <input className="check-button__checkbox" type="checkbox"/>
                    <span className="check-button__text">
                        { this.props.text }
                    </span>
                </label>
            </div>
        )
    }
}

export default CheckButton;