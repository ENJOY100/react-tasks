import React from 'react';
import PropTypes from 'prop-types';
import './checkbtn.scss';

export const CheckButton = (props) => {
    const {
        text,
        name,
        el,
        changeEvent
    } = props;

    let value = el ? el.checked : props.value;
    return (
        <div className="check-button">
            <label className="check-button__label">
                <input
                    checked={value}
                    className="check-button__checkbox"
                    type="checkbox"
                    onChange={(event) => changeEvent(event, name, el)}
                />
                { text &&
                    <div className="check-button__text">
                        {text}
                    </div>
                }
            </label>
        </div>
    )
}

CheckButton.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string,
    el: PropTypes.object,
    changeEvent: PropTypes.func
}