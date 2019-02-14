import React, {Component} from 'react';
import { storage } from '../../storage';
//import { Link } from 'react-router-dom';

import { View } from './todos';

import Category from '../../models/category';
import Todo from '../../models/todo';

import { getEditedTodo } from '../../utils/getEditedTodo';
import { getDeletedCategory } from '../../utils/getDeletedCategory';

export default class Todos extends Component {
    constructor() {
        super();
        this.state = {
            todos: {
                fetch: storage.fetch(),
                view: null,
                focus: null,
                selected: null
            },
            input: {
                categoryValue: '',
                todoValue: '',
                searchValue: '',
                modalNameValue: '',
                modalCheckValue: false,
                showValue: false
            },
            modal: {
                el: React.createRef(),
                hidden: true,
                status: '',
            }
        }
    }

    inputValueHandler = (event, name) => {
        const { input } = this.state;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        input[name] = value;
        this.setState({
            input: input
        });
    }

    inputValueClear = (name) => {
        const { input } = this.state;
        input[name] = '';
        this.setState({
            input: input
        });
    }

    searchValueChange = (event, name) => {
        const { todos } = this.state;
        if (!todos.view) {
            alert('Choose a category');
        } else if (todos.view && !todos.view.items.length) {
            alert('Add a todos');
        } else {
            this.inputValueHandler(event, name);
        }
    }

    addCategory = (event) => {
        event.preventDefault();
        const { todos, input } = this.state;

        if (!input.categoryValue) return alert('Enter caterogy title');
        const newCategory = new Category(input.categoryValue);

        todos.fetch.push(newCategory);

        this.stateUpdateTodos(todos);
        this.inputValueClear('categoryValue');
    }

    showTodos = (el, event) => {
        const { todos, input } = this.state;
        const id = todos.fetch.indexOf(el);

        todos.view = todos.fetch[id];
        input.searchValue = '';
        input.showValue = false;

        this.setState({
            input: input,
            todos: todos
        });
    }

    addTodo = () => {
        const { todos, input } = this.state;
        const id = todos.fetch.indexOf(todos.view);

        if (!todos.view) return alert('Choose category');
        if (!input.todoValue) return alert('Enter Todo title');
        const newTodo = new Todo(input.todoValue);
        todos.fetch[id].items.push(newTodo);

        this.stateUpdateTodos(todos);
        this.inputValueClear('todoValue');
    }

    deleteCategory = (el, event) => {
        const { todos } = this.state;

        this.stateUpdateTodos(getDeletedCategory(todos, el));
        event.stopPropagation();
    }

    addSubCategory = () => {
        const { todos, input } = this.state;

        if (!input.modalNameValue) return alert('Enter the category title');
        const id = todos.fetch.indexOf(todos.focus);
        const newCategory = new Category(input.modalNameValue, todos.fetch[id].id);
        todos.fetch.push(newCategory);

        this.stateUpdateTodos(todos);
        this.modalClose();
    }

    modalOpen = (preset, el, event, parent) => {
        const { todos, input, modal } = this.state;

        modal.hidden = false;
        switch (preset) {
            case 'add': {
                modal.status = preset;
                todos.focus = el;
                this.setState({
                    modal: modal,
                    todos: todos
                });
                break;
            }
            case 'edit': {
                modal.status = preset;
                input.modalNameValue = el.name;
                todos.focus = el;
                this.stateUpdateAll(todos, input, modal);
                break;
            }
            case 'edit-todo': {
                modal.status = preset;
                input.modalNameValue = el.name;
                input.modalCheckValue = el.checked;
                todos.focus = el;
                this.stateUpdateAll(todos, input, modal);
                break;
            }
        }
        event.stopPropagation();
    }

    modalClose = () => {
        const { todos, input, modal } = this.state;
        modal.hidden = true;
        modal.status = input.modalNameValue = '';
        input.modalСheckValue = false;
        todos.focus = todos.selected = null;

        this.stateUpdateAll(todos, input, modal);
    }

    stateUpdateAll = (todos, input, modal) => {
        storage.save(todos.fetch);
        this.setState({
            todos: todos,
            input: input,
            modal: modal
        });
    }

    stateUpdateTodos = (todos) => {
        storage.save(todos.fetch);
        this.setState({
            todos: todos,
        });
    }

    openList = (el, event) => {
        const { todos } = this.state;
        const id = todos.fetch.indexOf(el);
        todos.fetch[id].opened = !todos.fetch[id].opened;

        this.stateUpdateTodos(todos);
        event.stopPropagation();
    }

    editCategory = () => {
        const { todos, input } = this.state;

        if (!input.modalNameValue) return alert('Enter the category title');
        const id = todos.fetch.indexOf(todos.focus);
        todos.fetch[id].name = input.modalNameValue;

        this.stateUpdateTodos(todos);
        this.modalClose();
    }

    editTodo = () => {
        const { todos, input } = this.state;

        this.stateUpdateTodos(getEditedTodo(todos, input));
        this.modalClose();
    }

    selectCategory = (el, event) => {
        const { todos } = this.state;
        const id = todos.fetch.indexOf(el);
        todos.selected = todos.fetch[id];

        this.stateUpdateTodos(todos);
    }

    singleTodoCheck = (value, el) => {
        const { todos } = this.state;
        const catID = todos.fetch.indexOf(todos.view);
        const todoID = todos.view.items.indexOf(el);
        todos.fetch[catID].items[todoID].checked = value;

        this.stateUpdateTodos(todos);
    }

    treeClear = () => {
        const { todos } = this.state;
        todos.fetch = [];
        storage.clear();
        this.setState({
            todos: todos,
        });
    }

    render() {
        return (
            <View
                todos={this.state.todos}
                input={this.state.input}
                modal={this.state.modal}
                addCategory={this.addCategory}
                inputValueHandler={this.inputValueHandler}
                searchValueChange={this.searchValueChange}
                inputValueClear={this.inputValueClear}
                addTodo={this.addTodo}
                treeClear={this.treeClear}
                showTodos={this.showTodos}
                deleteCategory={this.deleteCategory}
                modalOpen={this.modalOpen}
                modalClose={this.modalClose}
                openList={this.openList}
                selectCategory={this.selectCategory}
                addSubCategory={this.addSubCategory}
                editCategory={this.editCategory}
                editTodo={this.editTodo}
                singleTodoCheck={this.singleTodoCheck}
            />
        );
    }
}