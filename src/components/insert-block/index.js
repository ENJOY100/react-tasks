import React, { Component } from 'react';
import { View } from './insert-block';

import './insert-block.scss';

export default class InsertBlock extends Component {

    handleKeyPress = (event, name) => {
        if (event.key === 'Enter'){
            this.props.clickEvent(event, name);
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