import React, { Component } from 'react';
import '../assets/core_blocks/CheckButton.css';

class CheckButton extends Component {
    render() {
        return (
            <label className="check-button">
             <input
                 defaultChecked={this.props.showDoneValue}
                 className="check-button__checkbox"
                 type="checkbox"
                 onChange={(event) => this.props.showDownValueChange(event)}
             />
             <span className="check-button__text">
                 { this.props.text }
             </span>
         </label>
        )
    }
}

export default CheckButton;