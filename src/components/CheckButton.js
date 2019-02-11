import React, { Component } from 'react';
import '../assets/core_blocks/CheckButton.css';

class CheckButton extends Component {
    render() {
        //let clickEvent;
        //if (this.props.showDone) clickEvent = this.props.showDone;
        {/*<label className="check-button">
                <input
                    value={this.props.showDoneValue}
                    className="check-button__checkbox"
                    type="checkbox"
                    onChange={(event) => this.props.showDownValueChange(event)}
                />
                <span className="check-button__text">
                    { this.props.text }
                </span>
                { this.props.showDoneValue &&
                    <span>checked</span>
                }
            </label>*/}
        return (
            <label className="check-button">
                <input
                    value={this.props.showDoneValue}
                    className="check-button__checkbox"
                    type="checkbox"
                    onChange={(event) => this.props.showDownValueChange(event)}
                />
                <span className="check-button__text">
                    { this.props.text }
                </span>
                { this.props.showDoneValue &&
                    <span>checked</span>
                }
            </label>
        )
    }
}

export default CheckButton;