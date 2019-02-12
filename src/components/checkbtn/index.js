import React, { Component } from 'react';
import './checkbtn.scss';

export default class CheckButton extends Component {
    render() {
        const { changeEvent, showDoneValue, text, name } = this.props;
        return (
            <button className="check-button">
                <label className="check-button__label">
                    <input
                        checked={showDoneValue}
                        className="check-button__checkbox"
                        type="checkbox"
                        onChange={(event) => changeEvent(event, name)}
                    />
                    <span className="check-button__text">
                         {text}
                     </span>
                </label>
            </button>
        )
    }
}