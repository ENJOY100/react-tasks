import React, { Component } from 'react';
import Button from './Button';
import '../assets/core_blocks/SearchBlock.css';

class SearchBlock extends Component {
    render() {
        return (
            <div className="search-block">
                <input className="search-block__input" type="text" placeholder={this.props.placeholderName}/>
                <div className="search-block__button">
                    <Button preset="close" />
                </div>
            </div>
        )
    }
}

export default SearchBlock;