import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './todo-list.scss';

export class TodosList extends Component {
    render() {
        const { todos, input } = this.props;

        let alertText = '';
        if ((!todos.listItems && input.searchValue) || input.showValue) {
            alertText = 'No match found';
        } else if ( todos.list && !todos.listItems ) {
            alertText = 'Todos is null, please add';
        }

        return (
            <ul className="todo-list">
                { todos.listItems || alertText }
            </ul>
        )
    }
}

TodosList.propTypes = {
    todos: PropTypes.object,
    input: PropTypes.object
}