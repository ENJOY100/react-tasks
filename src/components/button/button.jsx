import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export const Button = (props) => {
    const buttonClass = `btn-ui btn-ui--${props.preset}`;
    return (
        <button className={buttonClass}></button>
    )
}

Button.propTypes = {
    preset: PropTypes.string
}