import React, {Component} from 'react';
import { View } from './todo-item';
import './todo-item.scss';

export default class TodoItem extends Component {

    changeEvent = (event, el) => {
        const value = event.target.value;
        this.props.singleTodoCheck(value, el);
    }

    render() {
        return (
            <View
                key={this.props.el.id}
                el={this.props.el}
                modalOpen={this.props.modalOpen}
                changeEvent={this.changeEvent}
            />
        )
    }
}