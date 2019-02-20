import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './search-block.scss';

export class SearchBlock extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
        }
    }

    changeEvent = (event, name) => {
        this.setState({
            value: event.target.value
        });
        this.props.changeEvent(event.target.value, name);
    }

    clearInput = (name) => {
        this.setState({
            value: ''
        });
        this.props.changeEvent('', name);
    }

    render() {
        return (
            <div className="search-block">
                <input value={this.state.value}
                       onChange={(event) => this.changeEvent(event, this.props.name)}
                       className="search-block__input" type="text" placeholder={this.props.placeholderName}
                />
                { this.state.value &&
                <div className="search-block__button" onClick={() => this.clearInput(this.props.name)}>
                    <Button preset="close" />
                </div>
                }
            </div>
        )
    }
}

SearchBlock.propTypes = {
    name: PropTypes.string,
    placeholderName: PropTypes.string,
    changeEvent: PropTypes.func
}