import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoItem from './todo-item';

import { updateTodosFetchAction } from '../../../store/todos/actions';

import './todo-list.scss';

class TodosList extends Component {
    render() {
        let {
            todos,
            todos: { filteredTodos = [] },
            input,
            modalOpen
        } = this.props;

        if (filteredTodos) {
            filteredTodos = filteredTodos.map(todo =>
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    modalOpen={modalOpen}
                />
            );
        }

        return (
            <ul className="todo-list">
                { filteredTodos || getMessage(todos, input) }
            </ul>
        )
    }
}

function getMessage(todos, input) {
    if ((!todos.filteredTodos && input.searchValue) || input.showValue) {
        return 'No match found';
    }
    if ( todos.selectedCategory && !todos.filteredTodos ) {
        return 'Todos is null, please add';
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        input: state.input
    };
}

const mapDispatchToProps = {
    updateTodosFetchAction
}

export const container = connect(mapStateToProps, mapDispatchToProps)(TodosList);

TodosList.propTypes = {
    todos: PropTypes.shape({
        filteredTodos: PropTypes.array,
        selectedCategory: PropTypes.object
    }),
    input: PropTypes.shape({
        showValue: PropTypes.bool
    }),
    updateTodosFetchAction: PropTypes.func
}