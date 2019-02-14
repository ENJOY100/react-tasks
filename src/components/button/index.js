import React from 'react';
import { View } from './button';

import './button.scss';

const Button = (props) => {
    const buttonClass = `btn-ui btn-ui--${props.preset}`;
    return (
        <View buttonClass={buttonClass}/>
    )
}

export default Button;