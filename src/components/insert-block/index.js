import React, { Component } from 'react';
import './insert-block.scss'

export default class InsertBlock extends Component {
    render() {
        const { style, value, name, changeEvent, clickEvent, placeholderName } = this.props;
        return (
            <div className="insert-block" style={style}>
                <input
                    value={value}
                    onChange={(event) => changeEvent(event, name)}
                    className="insert-block__input" type="text"
                    placeholder={placeholderName}
                />
                <button className="insert-block__btn" onClick={clickEvent}>
                    Add
                </button>
            </div>
        )
    }
}