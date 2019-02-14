import React, { Component } from 'react';
import { View } from "./select";

import './select.scss';

export default class Select extends Component {
    constructor() {
        super();
        this.state = {
            select: {
                class: 'select',
                opened: false
            }
        }
    }
    selectOpen = () => {
        const { select } = this.state;

        select.opened = !select.opened;

        const opened = select.opened ? 'opened' : '';
        select.class = `select ${opened}`;

        this.setState({
            select: {
                class: select.class,
                opened: select.opened
            }
        });
    }
    render() {
        return (
           <View
                todos={this.props.todos}
                selectCategory={this.props.selectCategory}
                select={this.state.select}
                selectOpen={this.selectOpen}
           />
        )
    }
}