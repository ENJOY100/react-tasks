import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './todo-item-view';

import { updateTodosFetchAction } from '../../../store/todos/actions';

import './todo-item.scss';

class TodoItem extends Component {

    constructor() {
        super();
        this.state = {
            checked: false
        }
    }

    changeEvent = (value, todo) => {
        this.setState({
            checked: value
        });
        this.singleTodoCheck(value, todo);
    }

    singleTodoCheck = (value, todo) => {
        const { todos, updateTodosFetchAction } = this.props;
        const catID = todos.fetch.indexOf(todos.selectedCategory);
        const todoID = todos.selectedCategory.items.indexOf(todo);

        todos.fetch[catID].items[todoID].checked = value;

        updateTodosFetchAction(todos.fetch);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.todo.checked !== prevState.checked) {
            return {
                checked: nextProps.todo.checked
            }
        }
        return false;
    }

    render() {
        return (
            <View
                key={this.props.todo.id}
                todo={this.props.todo}
                value={this.state.checked}
                modalOpen={this.props.modalOpen}
                changeEvent={this.changeEvent}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

const mapDispatchToProps = {
    updateTodosFetchAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

TodoItem.propTypes = {
    todos: PropTypes.shape({
        fetch: PropTypes.array,
        selectedCategory: PropTypes.shape({
            items: PropTypes.array
        }),
    }),
    todo: PropTypes.shape({
        checked: PropTypes.bool
    }),
    modalOpen: PropTypes.func,
    updateTodosFetchAction: PropTypes.func,
}