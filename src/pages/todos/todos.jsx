import React, {Component} from 'react';
import { storage } from '../../storage';

import { View } from './todos-view';
import Category from '../../models/category';
import Todo from '../../models/todo';
import { getFilteredTodos } from '../../utils/get-filtered-todos';

export class Todos extends Component {
    constructor() {
        super();
        this.state = {
            todos: {
                fetch: storage.fetch(),
                list: null,
                listItems: null,
                focus: null
            },
            input: {
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

    checkChanger = (event, name) => {
        const { todos, input } = this.state;
        input[name] = event.target.checked;
        this.setState({
            input: input
        });
        if (todos.list) {
            todos.listItems = getFilteredTodos(todos, input, todos.list.id, this.modalOpen, this.stateUpdateTodos);
        }
    }

    searchChanger = (value) => {
        const { todos, input } = this.state;
        input.searchValue = value;
        this.setState({
            input: input
        });
        if (todos.list) {
            todos.listItems = getFilteredTodos(todos, input, todos.list.id, this.modalOpen, this.stateUpdateTodos);
        }
    }

    addCategory = (event, value) => {
        if (!value) return;
        event.preventDefault();
        const { todos } = this.state;
        const newCategory = new Category(value);

        todos.fetch.push(newCategory);
        this.stateUpdateTodos(todos);
    }

    showTodos = (el) => {
        this.props.history.push(`/category/${el.id}`);
        const { todos, input } = this.state;
        const id = todos.fetch.indexOf(el);

        todos.list = todos.fetch[id];
        todos.listItems = getFilteredTodos(todos, input, el.id, this.modalOpen, this.stateUpdateTodos);
        this.setState({
            todos: todos,
            input: input
        });
    }

    addTodo = (event, value) => {
        if (!value) return;
        event.preventDefault();
        const { todos, input } = this.state;
        const id = todos.fetch.indexOf(todos.list);
        const newTodo = new Todo(value);

        todos.fetch[id].items.push(newTodo);
        todos.listItems = getFilteredTodos(todos, input, todos.list.id, this.modalOpen, this.stateUpdateTodos);
        this.stateUpdateTodos(todos);
    }

    modalOpen = (preset, el, event) => {
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
            default:
                return false;
        }
        event.stopPropagation();
    }

    modalClose = () => {
        const { todos, input, modal } = this.state;

        modal.hidden = true;
        modal.status = input.modalNameValue = '';
        input.modalСheckValue = false;
        todos.focus = null;
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
            todos: todos
        });
    }

    treeClear = () => {
        const { todos } = this.state;
        todos.fetch = [];
        todos.list = todos.listItems = null;
        storage.clear();
        this.setState({
            todos: todos,
        });
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;
        if (slug) {
            const { todos, input } = this.state;
            todos.list = todos.fetch ? todos.fetch.find(el => el.id === parseFloat(slug)) : null;
            todos.listItems = getFilteredTodos(todos, input, slug, this.modalOpen, this.stateUpdateTodos, this.props);
            this.stateUpdateTodos(todos);
        }
    }

    render() {
        return (
            <View
                todos={this.state.todos}
                input={this.state.input}
                modal={this.state.modal}
                checkChanger={this.checkChanger}
                searchChanger={this.searchChanger}
                addCategory={this.addCategory}
                showTodos={this.showTodos}
                addTodo={this.addTodo}
                modalOpen={this.modalOpen}
                modalClose={this.modalClose}
                stateUpdateTodos={this.stateUpdateTodos}
                treeClear={this.treeClear}
            />
        )
    }
}