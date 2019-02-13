import React, { Component } from 'react';
import './insert-block.scss'

import { View } from './insert-block';

export default class InsertBlock extends Component {

    handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            this.props.clickEvent(event);
        }
    }

    render() {
        return (
            <View
                value={this.props.value}
                name={this.props.name}
                changeEvent={this.props.changeEvent}
                clickEvent={this.props.clickEvent}
                placeholderName={this.props.placeholderName}
                handleKeyPress={this.handleKeyPress}
            />
        )
    }
}