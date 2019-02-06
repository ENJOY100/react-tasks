import React, { Component } from 'react';
import '../assets/core_blocks/SearchInput.css';

class SearchInput extends Component {
    render() {
        return (
            <div className="search-input">
                <input className="search-input__input" type="text" placeholder={this.props.placeholderName}/>
                <button className="search-input__button">х</button>
            </div>
        )
    }
}

export default SearchInput;