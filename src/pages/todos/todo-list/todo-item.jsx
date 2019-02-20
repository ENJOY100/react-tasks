import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View } from './todo-item-view';
import './todo-item.scss';

export default class TodoItem extends Component {

    constructor() {
        super();
        this.state = {
            checked: null
        }
    }

    changeEvent = (event, name, el) => {
        this.setState({
            checked: event.target.checked
        })
        this.singleTodoCheck(event.target.checked, el);
    }

    singleTodoCheck = (value, el) => {
        const { todos, stateUpdateTodos } = this.props;

        const catID = todos.fetch.indexOf(todos.list);
        const todoID = todos.list.items.indexOf(el);
        todos.fetch[catID].items[todoID].checked = value;

        stateUpdateTodos(todos);
    }

    componentDidMount() {
        this.setState({
            checked: this.props.el.checked
        })
    }

    render() {
        return (
            <View
                key={this.props.el.id}
                el={this.props.el}
                modalOpen={this.props.modalOpen}
                changeEvent={this.changeEvent}
                checkedValue={this.state.checked}
            />
        )
    }
}

TodoItem.propTypes = {
    todos: PropTypes.object,
    el: PropTypes.object,
    stateUpdateTodos: PropTypes.func,
    modalOpen: PropTypes.func
}