import React, { Component } from 'react';
import { View } from './search-block';
import './search-block.scss';

export default class SearchBlock extends Component {
    render() {
        return (
            <View
                placeholderName={this.props.placeholderName}
                input={this.props.input}
                changeEvent={this.props.changeEvent}
                clearSearchInput={this.props.clearSearchInput}
                name={this.props.name}
            />
        )
    }
}