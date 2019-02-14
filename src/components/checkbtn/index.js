import React from 'react';
import { View } from './checkbtn';

import './checkbtn.scss';

const CheckButton = (props) => {
    return (
        <View
            text={props.text}
            name={props.name}
            input={props.input}
            changeEvent={props.changeEvent}
        />
    )
}

export default CheckButton;