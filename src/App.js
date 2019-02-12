import React, {Component} from 'react';

import InsertBlock from './components/InsertBlock';
import CheckButton from './components/CheckButton';
import SearchBlock from './components/SearchBlock';
import TodosTree from './components/TodosTree';
import TodosView from './components/TodosView';

import '../node_modules/aline.css/dist/aline.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './assets/css/core.css';
import Modal from "./components/Modal";

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
            modalAdd: false,
            modalEditCat: false,
            modalEditTodo: false,
            modalNameValue: '',
            modalCheckValue: false,
            selectedCategory: null,
            searchValue: '',
            showDoneValue: false,
        }
    }

    Category(name, parentID) {
        this.id = Math.floor(Math.random() * (10**10 - 10 + 1) + 10);
        this.name = name;
        this.items = [];
        this.opened = false;
        this.parentID = parentID;
    }

    inputValueHandler = (event, name) => {
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value,
        })
    }

    inputValueClear = (name) => {
        this.setState({
            [name]: '',
        });
    }

    modalMU = (e) => {
        if (!this.state.modal.current.contains(e.target) && !this.state.modalHidden) {
            this.modalClose();
        }
    }

    searchValueChange = (event) => {
        if (!this.state.todosView) {
            alert('Choose a category');
        } else if (this.state.todosView && !this.state.todosView.items.length) {
            alert('Add a todos');
        } else {
            this.setState({
                searchValue: event.target.value,
            });
        }
    }

    addCategory = () => {
        if (!this.state.addCatValue) return alert('Enter caterogy title');
        let todos = this.state.todos;
        let newCat = new this.Category(this.state.addCatValue);
        todos.push(newCat);
        this.setState({
            todos: todos,
        });
        this.inputValueClear('addCatValue');
    }

    showTodos = (el, event) => {
        this.setState({
            searchValue: '',
            showDoneValue: false,
        });
        let id = this.state.todos.indexOf(el);
        let todosView = this.state.todos[id];
        this.setState({
            todosView: todosView,
        });
    }

    addTodo = () => {
        if (!this.state.todosView) return alert('Choose category');
        if (!this.state.addTodoValue) return alert('Enter Todo title');
        let id = this.state.todos.indexOf(this.state.todosView);
        let todos = this.state.todos;
        todos[id].items.push({
            id: Math.floor(Math.random() * (10**10 - 10 + 1) + 10),
            name: this.state.addTodoValue,
            checked: false,
        })
        this.setState({
            todos: todos,
        })
        this.inputValueClear('addTodoValue');
    }

    deleteCategory = (el, event) => {
        let id = this.state.todos.indexOf(el);
        let todos = this.state.todos;
        todos.splice(id, 1);
        this.setState({
            todos: todos,
        });
        if (this.state.todosView === el) {
            this.setState({
                todosView: null
            });
        }
        event.stopPropagation();
    }

    addSubCategory = () => {
        if (!this.state.modalNameValue) return alert('Enter the category title');
        let id = this.state.todos.indexOf(this.state.focusElement);
        let todos = this.state.todos;
        let newCat = new this.Category(this.state.modalNameValue, todos[id].id);
        todos.push(newCat);
        this.setState({
            todos: todos,
        });
        this.modalClose();
    }

    modalOpen = (preset, el, event, parent) => {
        switch (preset) {
            case 'add': {
                this.setState({
                    modalAdd: true,
                    focusElement: el,
                });
                break;
            }
            case 'editcat': {
                this.setState({
                    modalEditCat: true,
                    focusElement: el,
                    modalNameValue: el.name,
                });
                break;
            }
            case 'edittodo': {
                this.setState({
                    modalEditTodo: true,
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

    modalClose = () => {
        this.setState({
            modalHidden: true,
            modalAdd: false,
            modalEditCat: false,
            modalEditTodo: false,
            modalNameValue: '',
            modalCheckValue: false,
            focusElement: null,
            selectedCategory: null,
        });
    }

    openList = (el, event) => {
        let id = this.state.todos.indexOf(el);
        let todos = this.state.todos;
        todos[id].opened = !todos[id].opened;
        this.setState({
            todos: todos,
        });
        event.stopPropagation();
    }

    editCategory = () => {
        if (!this.state.modalNameValue) return alert('Enter the category title');
        let id = this.state.todos.indexOf(this.state.focusElement);
        let todos = this.state.todos;
        todos[id].name = this.state.modalNameValue;
        this.setState({
            todos: todos,
        });
        this.modalClose();
    }

    editTodo = () => {
        if (!this.state.modalNameValue) return alert('Enter the Todo title');

        let id = this.state.todos.indexOf(this.state.todosView);
        let todos = this.state.todos;
        let todoID = this.state.todos[id].items.indexOf(this.state.focusElement);

        let todoEL = this.state.focusElement;

        todoEL.name = this.state.modalNameValue;
        todoEL.checked = this.state.modalCheckValue;

        if (this.state.selectedCategory) {
            let selectedID = this.state.todos.indexOf(this.state.selectedCategory);
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

    selectCategory = (el, event) => {
        let id = this.state.todos.indexOf(el);
        let todos = this.state.todos;

        this.setState({
            selectedCategory: todos[id],
        });
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.modalMU);
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
                                            placeholderName="Enter category titles" style={{width: '80%'}}
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
                                                    placeholderName="Text input with button" style={{width: '100%'}}
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
                    modalHidden={this.state.modalHidden}
                    modalAdd={this.state.modalAdd}
                    modalEditCat={this.state.modalEditCat}
                    modalEditTodo={this.state.modalEditTodo}
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