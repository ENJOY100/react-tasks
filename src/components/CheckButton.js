import React, { Component } from 'react';
import '../assets/core_blocks/CheckButton.css';

class CheckButton extends Component {
    render() {
        return (
            <div className="check-button">
                <label className="check-button__label">
                    <input className="check-button__checkbox" type="checkbox"/>
                    <span className="check-button__checkbox">
                        { this.props.text }
                    </span>
                </label>
            </div>
        )
    }
}

export default CheckButton;