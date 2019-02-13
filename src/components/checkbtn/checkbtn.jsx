import React from 'react';

export const View = (props) => {
    const { changeEvent, input, text, name } = props;
    return (
        <button className="check-button">
            <label className="check-button__label">
                <input
                    checked={input.showValue}
                    className="check-button__checkbox"
                    type="checkbox"
                    onChange={(event) => changeEvent(event, name)}
                />
                <span className="check-button__text">
                     {text}
                 </span>
            </label>
        </button>
    );
}