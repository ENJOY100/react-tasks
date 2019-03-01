import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './modal-simple-edit-view';

import Category from "../../../models/category";

import { updateTodosFetchAction, changeTodos, pushTodos } from '../../../store/todos/actions';
import { modalCloseAction } from '../../../store/modal/actions';

class ModalSimpleEdit extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    inputChangeEvent = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    handleKeyUp = (event) => {
        if (event.key === 'Enter'){
            this.clickEvent();
        }
    }

    addSubCategory = (value) => {
        if (!value) return;
        const { todos, modalCloseAction, updateTodosFetchAction } = this.props;

        const id = todos.fetch.indexOf(todos.focus);
        const newCategory = new Category(value, todos.fetch[id].id);

        todos.fetch.push(newCategory);

        updateTodosFetchAction(todos.fetch);
        modalCloseAction();
        this.props.pushTodos(newCategory);
    }

    editCategory = (value) => {
        if (!value) return;
        const { todos, updateTodosFetchAction, modalCloseAction } = this.props;
        const id = todos.fetch.indexOf(todos.focus);

        todos.fetch[id].name = value;
        updateTodosFetchAction(todos.fetch);
        modalCloseAction();
        this.props.changeTodos(todos.fetch[id]);
    }

    clickEvent = () => {
        switch (this.props.status) {
            case 'add': {
                return this.addSubCategory(this.state.value);
            }
            case 'edit': {
                return this.editCategory(this.state.value);
            }
            default: {
                return false;
            }
        }
    }

    componentDidMount() {
        this.setState({
            value: this.props.input.modalNameValue || ''
        })
    }

    render() {
        return (
            <View
                status={this.props.status}
                value={this.state.value}
                inputChangeEvent={this.inputChangeEvent}
                handleKeyUp={this.handleKeyUp}
                clickEvent={this.clickEvent}
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
    changeTodos,
    pushTodos
}

export const container = connect(mapStateToProps, mapDispatchToProps)(ModalSimpleEdit);

ModalSimpleEdit.propTypes = {
    status: PropTypes.string,
    todos: PropTypes.shape({
        fetch: PropTypes.array,
        focus: PropTypes.object,
    }),
    input: PropTypes.shape({
        modalNameValue: PropTypes.string
    }),
    modalOpen: PropTypes.func,
    modalCloseAction: PropTypes.func,
    updateTodosFetchAction: PropTypes.func
}