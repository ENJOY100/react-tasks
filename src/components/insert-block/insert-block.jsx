import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './insert-block.scss';

export class InsertBlock extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
        }
    }

    changeEvent = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    clickEvent = (event) => {
        if (!this.state.value) return;
        this.setState({
            value: ''
        });
        this.props.clickEvent(event, this.state.value);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            this.props.clickEvent(event, this.state.value);
            this.setState({
                value: ''
            });
        }
    }

    render() {
        return (
            <div className="insert-block">
                <input
                    value={this.state.value}
                    onChange={(event) => this.changeEvent(event)}
                    className="insert-block__input"
                    type="text"
                    placeholder={this.props.placeholderName}
                    onKeyDown={(event) => this.handleKeyPress(event)}
                />
                { this.clickEvent &&
                <button className="insert-block__btn" onClick={(event) => this.clickEvent(event)}>
                    Add
                </button>
                }
            </div>
        )
    }
}

InsertBlock.propTypes = {
    placeholderName: PropTypes.string
}