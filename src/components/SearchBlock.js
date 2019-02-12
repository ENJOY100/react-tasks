import React, { Component } from 'react';
import Button from './Button';
import '../assets/core_blocks/SearchBlock.css';

class SearchBlock extends Component {
    render() {
        return (
            <div className="search-block">
                <input value={this.props.searchValue}
                       onChange={(event) => this.props.searchValueChange(event)}
                       className="search-block__input" type="text" placeholder={this.props.placeholderName}
                />
                { this.props.searchValue &&
                    <div className="search-block__button" onClick={() => this.props.clearSearchInput(this.props.inputName)}>
                        <Button preset="close" />
                    </div>
                }
            </div>
        )
    }
}

export default SearchBlock;