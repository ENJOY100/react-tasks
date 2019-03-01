import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './modal-complex-edit-view';

import { getEditedTodos } from "../../../utils/get-edited-todos";
import { getFilteredTodos } from "../../../utils/get-filtered-todos";

import { updateTodosFetchAction, todosFilterAction, changeTodos } from '../../../store/todos/actions';
import { modalCloseAction } from '../../../store/modal/actions';

class ModalComplexEdit extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
            checked: false,
            selected: null
        }
    }

    checkedChangeEvent = (event) => {
        this.setState({
            checked: event.target.checked
        });
    }

    inputChangeEvent = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleKeyUp = (event) => {
        if (event.key === 'Enter'){
            this.editTodo();
        }
    }

    editTodo = () => {
        const { value, checked, selected } = this.state;
        if (!value) return;

        let { todos, input, modalCloseAction, updateTodosFetchAction, todosFilterAction } = this.props;

        todos = getEditedTodos(todos, value, checked, selected);
        todosFilterAction(getFilteredTodos(todos, input, todos.selectedCategory.id));
        updateTodosFetchAction(todos.fetch);
        modalCloseAction();

        this.props.changeTodos(todos.selectedCategory);
        if (selected) {
            this.props.changeTodos(selected);
        }
    }

    updateSelect = (value) => {
        this.setState({
            selected: value
        })
    }

    componentDidMount() {
        this.setState({
            value: this.props.input.modalNameValue || '',
            checked: this.props.input.modalCheckValue
        });
    }

    render() {
        return (
            <View
                status={this.props.status}
                value={this.state.value}
                checked={this.state.checked}
                inputChangeEvent={this.inputChangeEvent}
                checkedChangeEvent={this.checkedChangeEvent}
                handleKeyUp={this.handleKeyUp}
                updateSelect={this.updateSelect}
                clickEvent={this.editTodo}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        input: state.input
    };
}

const mapDispatchToProps = {
    updateTodosFetchAction,
    modalCloseAction,
    todosFilterAction,
    changeTodos
}

export const container = connect(mapStateToProps, mapDispatchToProps)(ModalComplexEdit);

ModalComplexEdit.propTypes = {
    status: PropTypes.string,
    todos: PropTypes.shape({
        filteredTodos: PropTypes.array,
        selectCategory: PropTypes.shape({
            id: PropTypes.number
        })
    }),
    input: PropTypes.shape({
        modalNameValue: PropTypes.string,
        modalCheckValue: PropTypes.bool
    }),
    updateTodosFetchAction: PropTypes.func,
    modalCloseAction: PropTypes.func,
    todosFilterAction: PropTypes.func
}