import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View } from './todos-view';

import Category from '../../models/category';
import Todo from '../../models/todo';

import ModalComplexEdit from '../../components/modal/modal-complex-edit';
import ModalSimpleEdit from '../../components/modal/modal-simple-edit';

import { getFilteredTodos } from '../../utils/get-filtered-todos';

import {
    todosFilterAction,
    changeTodosFocusAction,
    selectCategoryAction,
    updateTodosFetchAction,
    todosTreeClear,
    getTodos
} from '../../store/todos/actions';

import {
    inputChangeAction,
    changeModalNameValueAction,
    changeModalCheckValueAction,
} from '../../store/input/actions';

import {
    changeModalVisibleAction,
    changeModalFocusAction
} from '../../store/modal/actions';

class Todos extends Component {

    inputChanger = (value, name) => {
        const { todos, input, todosFilterAction, inputChangeAction } = this.props;

        input[name] = value;
        inputChangeAction(value, name);

        if (todos.selectedCategory) {
            todosFilterAction(getFilteredTodos(todos, input, todos.selectedCategory.id));
        }
    }

    addCategory = (value) => {
        const { todos, updateTodosFetchAction } = this.props;
        const newCategory = new Category(value);

        todos.fetch.push(newCategory);
        updateTodosFetchAction(todos.fetch);
    }

    showTodos = (category) => {
        this.props.history.push(`/category/${category.id}`);

        const { todos, input, selectCategoryAction, todosFilterAction } = this.props;
        const id = todos.fetch.indexOf(category);

        selectCategoryAction(todos.fetch[id]);
        todosFilterAction(getFilteredTodos(todos, input, category.id));
    }

    addTodo = (value) => {
        const { todos, input, updateTodosFetchAction, todosFilterAction } = this.props;

        if (!todos.selectedCategory) return;

        const id = todos.fetch.indexOf(todos.selectedCategory);
        const newTodo = new Todo(value);

        todos.fetch[id].items.push(newTodo);

        updateTodosFetchAction(todos.fetch);
        todosFilterAction(getFilteredTodos(todos, input, todos.selectedCategory.id));
    }

    modalOpen = (preset, item, event) => {

        this.props.changeModalVisibleAction(false);

        switch (preset) {
            case 'add': {
                const focus = (() => <ModalSimpleEdit status={preset} />)();
                this.props.changeTodosFocusAction(item);
                this.props.changeModalFocusAction(focus);
                break;
            }
            case 'edit': {
                const focus = (() => <ModalSimpleEdit status={preset} />)();
                this.props.changeModalNameValueAction(item.name);
                this.props.changeTodosFocusAction(item);
                this.props.changeModalFocusAction(focus);
                break;
            }
            case 'edit-todo': {
                const focus = (() => <ModalComplexEdit status={preset} />)();
                this.props.changeModalNameValueAction(item.name);
                this.props.changeModalCheckValueAction(item.checked);
                this.props.changeTodosFocusAction(item);
                this.props.changeModalFocusAction(focus);
                break;
            }
            default: {
                return false;
            }
        }
        event.stopPropagation();
    }

    componentDidMount() {
        this.props.getTodos();
        const { todos, input, selectCategoryAction, todosFilterAction } = this.props;

        const slug = this.props.match.params.slug;

        const historyCategory = todos.fetch.find(category => category.id === parseFloat(slug));

        if (!historyCategory && slug) {
            this.props.history.push(`/404`);
        }

        if (slug) {
            selectCategoryAction(todos.fetch ? historyCategory : null);
            todosFilterAction(getFilteredTodos(todos, input, slug));
        }
    }

    render() {
        return (
            <View
                todos={this.props.todos}
                input={this.props.input}
                modal={this.props.modal}
                inputChanger={this.inputChanger}
                addCategory={this.addCategory}
                showTodos={this.showTodos}
                addTodo={this.addTodo}
                modalOpen={this.modalOpen}
                treeClear={this.props.todosTreeClear}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos,
        input: state.input,
        modal: state.modal
    };
}

const mapDispatchToProps = {
    changeModalVisibleAction,
    inputChangeAction,
    todosFilterAction,
    changeTodosFocusAction,
    changeModalFocusAction,
    changeModalNameValueAction,
    changeModalCheckValueAction,
    selectCategoryAction,
    todosTreeClear,
    updateTodosFetchAction,
    getTodos
}

export const container = connect(mapStateToProps, mapDispatchToProps)(Todos);