import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './insert-block.scss';

export class InsertBlock extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    changeEvent = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    clickEvent = () => {
        if (!this.state.value) return;
        this.props.clickEvent(this.state.value);
        this.setState({
            value: ''
        });
    }

    handleKeyUp = (event) => {
        if (event.key === 'Enter'){
            this.clickEvent();
        }
    }

    render() {
        return (
            <div className="insert-block">
                <input
                    value={this.state.value}
                    onChange={this.changeEvent}
                    className="insert-block__input"
                    type="text"
                    placeholder={this.props.placeholderName}
                    onKeyUp={this.handleKeyUp}
                />
                <button className="insert-block__btn" onClick={this.clickEvent}>
                    Add
                </button>
            </div>
        )
    }
}

InsertBlock.propTypes = {
    placeholderName: PropTypes.string,
    clickEvent: PropTypes.func
}