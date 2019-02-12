import React, { Component } from 'react';
import View from './button';
import './button.scss';

export default class Button extends Component {
    render() {
        const buttonClass = `btn-ui btn-ui--${this.props.preset}`;
        return (
            <View buttonClass={buttonClass}/>
        )
    }
}