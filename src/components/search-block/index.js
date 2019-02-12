import React, { Component } from 'react';
import Button from '../button';
import './search-block.scss';

export default class SearchBlock extends Component {
    render() {
        const { searchValue, searchValueChange, clearSearchInput, placeholderName, inputName} = this.props;
        return (
            <div className="search-block">
                <input value={searchValue}
                       onChange={(event) => searchValueChange(event)}
                       className="search-block__input" type="text" placeholder={placeholderName}
                />
                { searchValue &&
                    <div className="search-block__button" onClick={() => clearSearchInput(inputName)}>
                        <Button preset="close" />
                    </div>
                }
            </div>
        )
    }
}