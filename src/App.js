import React, {Component} from 'react';
import './App.scss';
import 'aline.css/dist/aline.min.css';
import 'font-awesome/css/font-awesome.min.css';

import InsertBlock from './components/insert-block';
import CheckButton from './components/checkbtn';
import SearchBlock from './components/search-block';
import TodosTree from './components/todos/tree';
import TodosView from './components/todos/view';

import Modal from "./components/modal";

import Category from './utils/category'

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            todosView: null,
            focusElement: null,
            addCatValue: '',
            addTodoValue: '',
            modalHidden: true,
            modal: React.createRef(),
            modalStatus: '',
            modalNameValue: '',
            modalCheckValue: false,
            selectedCategory: null,
            searchValue: '',
            showDoneValue: false,
        }
    }

    // zbs
    inputValueHandler = (event, name) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value,
        })
    }

    // zbs
    inputValueClear = (name) => {
        this.setState({
            [name]: '',
        });
    }

    // zbs
    modalMU = (e) => {
        if (!this.state.modal.current.contains(e.target) && !this.state.modalHidden) {
            this.modalClose();
        }
    }

    // zbs
    searchValueChange = (event) => {
        const { todosView } = this.state;
        if (!todosView) {
            alert('Choose a category');
        } else if (todosView && !todosView.items.length) {
            alert('Add a todos');
        } else {
            this.setState({
                searchValue: event.target.value,
            });
        }
    }

    // zbs
    addCategory = () => {
        const { todos, addCatValue } = this.state;
        if (!addCatValue) return alert('Enter caterogy title');
        const newCat = new Category(addCatValue);
        todos.push(newCat);
        this.setState({
            todos: todos,
        });
        this.inputValueClear('addCatValue');
    }

    // zbs
    showTodos = (el, event) => {
        const { todos } = this.state;
        const id = todos.indexOf(el);
        const todosView = todos[id];
        this.setState({
            searchValue: '',
            showDoneValue: false,
        });
        this.setState({
            todosView: todosView,
        });
    }

    // zbs
    addTodo = () => {
        const { todos, todosView, addTodoValue } = this.state;
        const id = todos.indexOf(todosView);

        if (!todosView) return alert('Choose category');
        if (!addTodoValue) return alert('Enter Todo title');
        todos[id].items.push({
            id: Math.floor(Math.random() * (10**10 - 10 + 1) + 10),
            name: addTodoValue,
            checked: false,
        })
        this.setState({
            todos: todos,
        })
        this.inputValueClear('addTodoValue');
    }

    // zbs
    deleteCategory = (el, event) => {
        const { todos, todosView } = this.state;
        const id = todos.indexOf(el);
        todos.splice(id, 1);
        this.setState({
            todos: todos,
        });
        if (todosView === el) {
            this.setState({
                todosView: null
            });
        }
        event.stopPropagation();
    }

    // zbs
    addSubCategory = () => {
        const { todos, modalNameValue, focusElement } = this.state;
        if (!modalNameValue) return alert('Enter the category title');
        const id = todos.indexOf(focusElement);
        const newCat = new Category(modalNameValue, todos[id].id);
        todos.push(newCat);
        this.setState({
            todos: todos,
        });
        this.modalClose();
    }

    // zbs
    modalOpen = (preset, el, event, parent) => {
        switch (preset) {
            case 'add': {
                this.setState({
                    modalStatus: preset,
                    focusElement: el,
                });
                break;
            }
            case 'edit': {
                this.setState({
                    modalStatus: preset,
                    focusElement: el,
                    modalNameValue: el.name,
                });
                break;
            }
            case 'edit-todo': {
                this.setState({
                    modalStatus: preset,
                    focusElement: el,
                    modalNameValue: el.name,
                    modalCheckValue: el.checked,
                });
                break;
            }
        }
        this.setState({
            modalHidden: false,
        });
        event.stopPropagation();
    }

    // zbs
    modalClose = () => {
        this.setState({
            modalHidden: true,
            modalStatus: '',
            modalNameValue: '',
            modalCheckValue: false,
            focusElement: null,
            selectedCategory: null,
        });
    }

    // zbs
    openList = (el, event) => {
        const { todos } = this.state;
        const id = todos.indexOf(el);
        todos[id].opened = !todos[id].opened;
        this.setState({
            todos: todos,
        });
        event.stopPropagation();
    }

    // zbs
    editCategory = () => {
        const { todos, modalNameValue, focusElement } = this.state;
        if (!modalNameValue) return alert('Enter the category title');
        const id = todos.indexOf(focusElement);
        todos[id].name = this.state.modalNameValue;
        this.setState({
            todos: todos,
        });
        this.modalClose();
    }

    // zbs
    editTodo = () => {
        const { todos, todosView, focusElement, modalNameValue, modalCheckValue, selectedCategory } = this.state;
        const id = todos.indexOf(todosView);

        if (!modalNameValue) return alert('Enter the Todo title');

        const todoID = todos[id].items.indexOf(focusElement);
        const todoEL = focusElement;

        todoEL.name = modalNameValue;
        todoEL.checked = modalCheckValue;

        if (selectedCategory) {
            const selectedID = todos.indexOf(selectedCategory);
            todos[selectedID].items.push(todoEL);
            todos[id].items.splice(todoID, 1);
            this.setState({
                todos: todos,
            });
        } else {
            todos[id].items[todoID] = todoEL;
            this.setState({
                todos: todos,
            });
        }

        this.modalClose();
    }

    // zbs
    selectCategory = (el, event) => {
        const { todos } = this.state;
        const id = todos.indexOf(el);
        this.setState({
            selectedCategory: todos[id],
        });
    }

    // zbs
    componentDidMount() {
        document.addEventListener('mouseup', this.modalMU);
    }

    //zbs
    componentWillUnmount() {
        document.removeEventListener('mouseup', this.modalMU);
    }

    render() {
        return (
            <React.Fragment>
                <section className="app">
                    <div className="c">

                        <div className="app__header ptb-20">
                            <div className="r ai-c">

                                <div className="col-30">
                                    <div className="app__left">
                                        <InsertBlock
                                            placeholderName="Enter category titles"
                                            clickEvent={this.addCategory}
                                            changeEvent={this.inputValueHandler}
                                            value={this.state.addCatValue}
                                            name="addCatValue"
                                        />
                                    </div>
                                </div>

                                <div className="col-70">
                                    <div className="app__right">
                                        <div className="r ai-c cp-5">
                                            <div className="col-15">
                                                <CheckButton
                                                    text="Show done"
                                                    name="showDoneValue"
                                                    showDoneValue={this.state.showDoneValue}
                                                    changeEvent={this.inputValueHandler}
                                                />
                                            </div>
                                            <div className="col-40">
                                                <SearchBlock
                                                    placeholderName="Search"
                                                    searchValue={this.state.searchValue}
                                                    searchValueChange={this.searchValueChange}
                                                    clearSearchInput={this.inputValueClear}
                                                    inputName="searchValue"
                                                />
                                            </div>
                                            <div className="col-45">
                                                <InsertBlock
                                                    placeholderName="Text input with button"
                                                    clickEvent={this.addTodo}
                                                    changeEvent={this.inputValueHandler}
                                                    value={this.state.addTodoValue}
                                                    name="addTodoValue"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="app__body pt-30">
                            <div className="r h-100 ai-str">

                                <div className="col-30 h-100">
                                    <div className="app__body-left h-100">
                                        <TodosTree
                                            todos={this.state.todos}
                                            showTodos={this.showTodos}
                                            deleteCategory={this.deleteCategory}
                                            modalOpen={this.modalOpen}
                                            modalAdd={this.state.modalAdd}
                                            openList={this.openList}
                                        />
                                    </div>
                                </div>

                                <div className="col-70 h-100">
                                    <div className="app__body-right h-100">
                                        <TodosView
                                            todosView={this.state.todosView}
                                            todos={this.state.todos}
                                            modalOpen={this.modalOpen}
                                            searchValue={this.state.searchValue}
                                            showDoneValue={this.state.showDoneValue}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
                <Modal
                    todos={this.state.todos}
                    openList={this.openList}
                    selectCategory={this.selectCategory}
                    modal={this.state.modal}
                    modalClose={this.modalClose}
                    modalStatus={this.state.modalStatus}
                    modalHidden={this.state.modalHidden}
                    addSubCategory={this.addSubCategory}
                    editCategory={this.editCategory}
                    editTodo={this.editTodo}
                    modalNameValue={this.state.modalNameValue}
                    modalCheckValue={this.state.modalCheckValue}
                    inputName="modalNameValue"
                    checkName="modalCheckValue"
                    changeEvent={this.inputValueHandler}
                    selectedCategory={this.state.selectedCategory}
                />
            </React.Fragment>
        );
    }
}

export default App;