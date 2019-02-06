import React, { Component } from 'react';
import '../assets/core_blocks/InsertBlock.css'

class InsertBlock extends Component {
    render() {
        return (
            <div className="insert-block" style={this.props.style}>
                <input className="insert-block__input" type="text" placeholder={this.props.placeholderName} />
                <button className="insert-block__btn">
                    Add
                </button>
            </div>
        )
    }
}

export default InsertBlock;