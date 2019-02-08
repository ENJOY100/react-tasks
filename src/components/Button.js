import React, { Component } from 'react';
import '../assets/core_blocks/Button.css';

class Button extends Component {
    render() {
        let buttonClass = `btn-ui btn-ui--${this.props.preset}`;

        return (
            <button className={buttonClass}></button>
        )
    }
}

export default Button;