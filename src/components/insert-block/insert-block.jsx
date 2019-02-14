import React from 'react';

export const View = (props) => {
    const { value, name, changeEvent, clickEvent, placeholderName, handleKeyPress } = props;
    return (
        <div className="insert-block">
            <input
                value={value}
                onChange={(event) => changeEvent(event, name)}
                className="insert-block__input" type="text"
                placeholder={placeholderName}
                onKeyDown={(event) => handleKeyPress(event, name)}
            />
            <button className="insert-block__btn" onClick={(event) => clickEvent(event, name)}>
                Add
            </button>
        </div>
    )
}