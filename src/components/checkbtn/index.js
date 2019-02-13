import React, { Component } from 'react';
import { View } from './checkbtn';
import './checkbtn.scss';

export default class CheckButton extends Component {
    render() {
        return (
            <View
                text={this.props.text}
                name={this.props.showValue}
                input={this.props.input}
                changeEvent={this.props.inputValueHandler}
            />
        )
    }
}