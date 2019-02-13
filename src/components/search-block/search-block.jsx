import React from 'react';
import Button from '../button';

export const View = (props) => {
    const { input, changeEvent, clearSearchInput, placeholderName, name } = props;
    return (
        <div className="search-block">
            <input value={input.searchValue}
                   onChange={(event) => changeEvent(event, name)}
                   className="search-block__input" type="text" placeholder={placeholderName}
            />
            { input.searchValue &&
            <div className="search-block__button" onClick={() => clearSearchInput(name)}>
                <Button preset="close" />
            </div>
            }
        </div>
    );
}