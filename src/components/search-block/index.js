import React from 'react';
import { View } from './search-block';

import './search-block.scss';

const SearchBlock = (props) => {
    return (
        <View
            placeholderName={props.placeholderName}
            input={props.input}
            changeEvent={props.changeEvent}
            clearSearchInput={props.clearSearchInput}
            name={props.name}
        />
    )
}

export default SearchBlock;