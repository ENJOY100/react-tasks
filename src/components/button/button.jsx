import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

export const Button = ({preset}) => {
    const buttonClass = `btn-ui btn-ui--${preset}`;
    return (
        <button className={buttonClass}></button>
    )
}

Button.propTypes = {
    preset: PropTypes.string
}