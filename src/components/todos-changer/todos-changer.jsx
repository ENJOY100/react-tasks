import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from './todos-changer-view';
import Category from '../../models/category';
import { getEditedTodo } from '../../utils/get-edited-todo';
import { getFilteredTodos } from '../../utils/get-filtered-todos';

export class TodosChanger extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            checked: true,
            selected: null,
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

    addSubCategory = (value) => {
        if (!value) return;
        const { todos, modalClose, stateUpdateTodos } = this.props;
        const id = todos.fetch.indexOf(todos.focus);
        const newCategory = new Category(value, todos.fetch[id].id);

        todos.fetch.push(newCategory);
        stateUpdateTodos(todos);
        modalClose();
    }

    editCategory = (value) => {
        if (!value) return;
        const { todos, stateUpdateTodos, modalClose } = this.props;
        const id = todos.fetch.indexOf(todos.focus);

        todos.fetch[id].name = value;
        stateUpdateTodos(todos);
        modalClose();
    }

    editTodo = (value, checked, selected) => {
        if (!value) return;
        let { todos, input, stateUpdateTodos, modalClose, modalOpen } = this.props;

        todos = getEditedTodo(todos, value, checked, selected);
        todos.listItems = getFilteredTodos(todos, input, todos.list.id, modalOpen, stateUpdateTodos);
        stateUpdateTodos(todos);
        modalClose();
    }

    updateSelect = (value) => {
        this.setState({
            selected: value
        })
    }

    clickEvent = () => {
        const { value, checked, selected } = this.state;
        const updateEvent = () => {
            switch (this.props.status) {
                case 'add': {
                    return this.addSubCategory(value);
                }
                case 'edit': {
                    return this.editCategory(value);
                }
                case 'edit-todo': {
                    return this.editTodo(value, checked, selected);
                }
                default:
                    return false;
            }
        }
        this.setState({
            value: ''
        });
        return updateEvent();
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            this.clickEvent(event, this.state.value);
            this.setState({
                value: ''
            });
        }
    }

    componentDidMount() {
        this.setState({
            value: this.props.input.modalNameValue || '',
            checked: this.props.input.modalCheckValue
        });
    }

    componentWillUnmount() {
        this.setState({
            value: '',
            checked: false,
            selected: null
        });
    }

    render() {
        const { status, todos, input } = this.props;
        return (
            <View
                todos={todos}
                input={input}
                status={status}
                value={this.state.value}
                checked={this.state.checked}
                checkedChangeEvent={this.checkedChangeEvent}
                inputChangeEvent={this.inputChangeEvent}
                handleKeyPress={this.handleKeyPress}
                updateSelect={this.updateSelect}
                clickEvent={this.clickEvent}
            />
        )
    }
}

TodosChanger.propTypes = {
    status: PropTypes.string,
    todos: PropTypes.object,
    input: PropTypes.object,
    modalOpen: PropTypes.func,
    modalClose: PropTypes.func,
    stateUpdateTodos: PropTypes.func
}