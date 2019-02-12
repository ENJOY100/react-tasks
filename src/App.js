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
            //todosSave: null,
            focusElement: null,
            addCatValue: '',
            addTodoValue: '',
            modalHidden: true,
            modal: React.createRef(),
            modalAdd: false,
            modalEditCat: false,
            modalEditTodo: false,
            modalName: '',
            modalCheck: false,
            selectedCategory: null,
            searchValue: '',
            showDoneValue: false,
            //showDoneValue: false,
            //testValue: false,
        }
    }

    Category(name, parentID) {
        this.id = Math.random();
        this.name = name;
        this.items = [];
        this.opened = false;
        this.parentID = parentID;
    }

    addCatValueChange = (event) => {
        this.setState({
            addCatValue: event.target.value,
        });
    }

    addTodoValueChange = (event) => {
        this.setState({
            addTodoValue: event.target.value,
        });
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

    showDownValueChange = (event) => {
        console.log('showDownValueChange');
        this.setState({
            showDoneValue: event.target.checked,
        });
    }

    // МОЖЕТ УПРОСТИТЬ эти инпут функции ???
    modalNameChange = (event) => {
        this.setState({
            modalName: event.target.value,
        });
    }

    modalCheckChange = (event) => {
        this.setState({
            modalCheck: event.target.checked,
        });
    }

    addCatValueClear = () => {
        this.setState({
            addCatValue: '',
        });
    }

    addTodoValueClear = () => {
        this.setState({
            addTodoValue: '',
        });
    }

    addCategory = () => {
        console.log('addCategory');
        if (!this.state.addCatValue) return alert('Enter caterogy title');
        let todos = this.state.todos;
        let newCat = new this.Category(this.state.addCatValue);
        todos.push(newCat);
        this.setState({
            todos: todos,
        });
        this.addCatValueClear();
    }

    showTodos = (el, event) => {
        console.log(el);
        console.log('showTodos');
        console.log(this.state.todos.indexOf(el));
        this.setState({
            searchValue: '',
            showDoneValue: false,
        });
        let id = this.state.todos.indexOf(el);
        let todosView = this.state.todos[id];
        this.setState({
            todosView: todosView,
        });
        //console.log(event.target);
    }

    addTodo = () => {
        console.log('AddTodo');
        if (!this.state.todosView) return alert('Choose category');
        if (!this.state.addTodoValue) return alert('Enter TODO title');
        let id = this.state.todos.indexOf(this.state.todosView);
        let todos = this.state.todos;
        todos[id].items.push({
            id: Math.random(),
            name: this.state.addTodoValue,
            checked: false,
        })
        this.setState({
            todos: todos,
            //todosView: todos[id], // это по сути не нужно
        })
        this.addTodoValueClear();
    }

    deleteCategory = (el, event) => {
        //console.log(event);
        //event.stopPropagation();
        //console.log('Delete category');
        //console.log(el);
        let id = this.state.todos.indexOf(el);
        let todos = this.state.todos;
        todos.splice(id, 1);
        this.setState({
            todos: todos,
        });
        if (this.state.todosView == el) {
            this.setState({
                todosView: null
            });
        }
        //console.log(id);
        event.stopPropagation();
    }

    addSubCategory = () => {
        console.log('addSubCategory');
        console.log(this.state.modalName);
        console.log(this.state.focusElement);
        if (!this.state.modalName) return alert('Enter the category title');
        let id = this.state.todos.indexOf(this.state.focusElement);
        let todos = this.state.todos;
        let newCat = new this.Category(this.state.modalName, todos[id].id);
        todos.push(newCat);
        this.setState({
            todos: todos,
        });
        this.modalClose();
        //console.log(todos[id]);
    }

    modalOpen = (preset, el, event, parent) => {
        console.log('modalOpen');
        //console.log(parentID);
        //let id = this.state.todos.indexOf(el);
        //let todos = this.state.todos;
        switch (preset) {
            case 'add': {
                //if (!parentID) return;
                this.setState({
                    modalAdd: true,
                    focusElement: el,
                    //modalName: todos[id].name,
                });
                break;
            }
            case 'editcat': {
                this.setState({
                    modalEditCat: true,
                    focusElement: el,
                    modalName: el.name,
                });
                break;
            }
            case 'edittodo': {
                console.log(el);
                console.log(this.state.modalCheck);
                this.setState({
                    modalEditTodo: true,
                    focusElement: el,
                    modalName: el.name,
                    modalCheck: el.checked,
                });
                console.log(this.state.modalCheck);
                break;
            }
        }
        //console.log('modalOpen');
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
            modalName: '',
            modalCheck: false,
            focusElement: null,
            selectedCategory: null,
        });
        /*this.setState({
            task_params_name: '',
            task_params_date: '',
        })*/
    }

    modalMU = (e) => {
        if (!this.state.modal.current.contains(e.target) && !this.state.modalHidden) {
            this.modalClose();
        }
    }

    openList = (el, event) => {
        console.log('openList');
        let id = this.state.todos.indexOf(el);
        let todos = this.state.todos;
        todos[id].opened = !todos[id].opened;
        this.setState({
            todos: todos,
        });
        event.stopPropagation();
    }

    editCategory = () => {
        console.log('editCategory');
        if (!this.state.modalName) return alert('Enter the category title');
        let id = this.state.todos.indexOf(this.state.focusElement);
        let todos = this.state.todos;
        todos[id].name = this.state.modalName;
        this.setState({
            todos: todos,
        });
        this.modalClose();
    }

    editTodo = () => {
        console.log('editTodo');
        if (!this.state.modalName) return alert('Enter the TODO title');

        let id = this.state.todos.indexOf(this.state.todosView); // ID категории, показывающей TODOxи
        let todos = this.state.todos;
        let todoID = this.state.todos[id].items.indexOf(this.state.focusElement); // ID выбранной TODOxи

        let todoEL = this.state.focusElement; // непосредственно наша TODOxа

        todoEL.name = this.state.modalName;
        todoEL.checked = this.state.modalCheck;

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

    /*showDone = () => {
        console.log('showDone');
        let showDoneValue = this.state.showDoneValue;
        if (showDoneValue === 'hidden') {
            showDoneValue = 'show';
        } else if (showDoneValue === 'show') {
            showDoneValue = 'hidden';
        }
        this.setState({
            showDoneValue: showDoneValue,
        });
    }*/

    /*showDone = (event) => {
        //ПЕРЕДЕЛАТЬ
        console.log('showDone');
        console.log(this.state.todosView);
        //console.log(this.state.todosView.items);
        let todosView, todoItems;
        if (!this.state.todosView) {
            event.preventDefault();
            alert('Please add a todos');
        }
        if (this.state.todosView.items.length > 0) {
            todosView = this.state.todosView;
            todoItems = todosView.items.filter((el) => {
                return !el.checked;
            });
            console.log(todoItems);
            for (let todo in todoItems) {
                todoItems[todo].hidden = !todoItems[todo].hidden;
            }
        }
        this.setState({
            todosView: todosView,
        });
    }*/

    selectCategory = (el, event) => {
        console.log('selectCategory');
        console.log(el);
        console.log(this.state.focusElement);

        let id = this.state.todos.indexOf(el);
        let todos = this.state.todos;

        this.setState({
            selectedCategory: todos[id],
        });
        //event.stopPropagation();
    }

    clearSearchInput = () => {
        this.setState({
            searchValue: '',
        });
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.modalMU);
    }

   /* componentWillMount() {
        console.log(this.state.todos)
    }*/

    /*componentWillUpdate(nextProps, nextState, nextContext) {
        console.log(`Will Update`);
        console.log(this.state.todosView);
    }*/

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
                                            addCatValue={this.state.addCatValue}
                                            addCategory={this.addCategory}
                                            addCatValueChange={this.addCatValueChange}/>
                                    </div>
                                </div>

                                <div className="col-70">
                                    <div className="app__right">
                                        <div className="r ai-c cp-5">
                                            <div className="col-15">
                                                <CheckButton
                                                    text="Show done"
                                                    showDownValue={this.state.showDownValue}
                                                    showDownValueChange={this.showDownValueChange}
                                                    showDone={this.showDone}
                                                />
                                            </div>
                                            <div className="col-40">
                                                <SearchBlock
                                                    placeholderName="Search"
                                                    searchValue={this.state.searchValue}
                                                    searchValueChange={this.searchValueChange}
                                                    clearSearchInput={this.clearSearchInput}
                                                    searchTodos={this.searchTodos}
                                                />
                                            </div>
                                            <div className="col-45">
                                                <InsertBlock
                                                    placeholderName="Text input with button" style={{width: '100%'}}
                                                    addTodoValue={this.state.addTodoValue}
                                                    addTodo={this.addTodo}
                                                    addTodoValueChange={this.addTodoValueChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="app__body pt-30">
                            <div className="r h-100 ai-str">

                                <div className="col-30">
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

                                <div className="col-70">
                                    <div className="app__body-right">
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
                    modalName={this.state.modalName}
                    modalNameChange={this.modalNameChange}
                    modalCheckChange={this.modalCheckChange}
                    modalCheck={this.state.modalCheck}
                    selectedCategory={this.state.selectedCategory}
                />
            </React.Fragment>
        );
    }
}

export default App;