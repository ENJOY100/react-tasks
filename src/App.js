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
            focusElement: {},
            addCatValue: '',
            addTodoValue: '',
            modalHidden: true,
            modal: React.createRef(),
            modalAdd: false,
            modalEditCat: false,
            modalEditTodo: false,
            modalName: '',

        }
        //this.modal = React.createRef();
        /*this.addCategory = this.addCategory.bind(this);*/
        // this.addCatValueChange = this.addCatValueChange.bind(this);
    }

    Category(name) {
        this.id = Math.random();
        this.name = name;
        //this.children = [];
        this.items = [];
        this.opened = false;
        this.parentID = null;
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

    modalNameChange = (event) => {
        this.setState({
            modalName: event.target.value,
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
            id: Math.random(), // ???
            name: this.state.addTodoValue,
            checked: false,
        })
        this.setState({
            todos: todos,
            //todosView: todos[id], // это по сути не нужно
        })
        this.addTodoValueClear();
    }

    deleteCategory = (el, parent, event) => {
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
        let id = this.state.todos.indexOf(this.state.focusElement);
        let todos = this.state.todos;
        let newCat = new this.Category(this.state.modalName);
        newCat.parentID = todos[id].id;
        todos.push(newCat);
        this.setState({
            todos: todos,
        });
        this.modalClose();
        //console.log(todos[id]);
    }

    /*Переделать структуру объектов в массиве, нам нужно чтобы был 1 массив общий со всеми объектами категориями,
    у категорий будет свойство parent указываюзее на id родительской категории(или на объект) (подобие relation)*/

    modalOpen = (preset, el, parentID, event) => {
        if (!parentID) return;
        console.log('modalOpen');
        console.log(parentID);
        let id = this.state.todos.indexOf(el);
        //let todos = this.state.todos;
        switch (preset) {
            case 'add': {
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
                });
                break;
            }
            case 'edittodo': {
                this.setState({
                    modalEditTodo: true,
                });
                break;
            }
        }
        console.log('modalOpen');
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
            focusElement: {},
        })
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

    openList = (el) => {
        console.log('openList');
        let id = this.state.todos.indexOf(el);
        let todos = this.state.todos;
        todos[id].opened = !todos[id].opened;
        this.setState({
            todos: todos,
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
                    {/*<div>
                        <span onClick={this.checkTodos}>Todos -</span>
                        {this.state.todos}
                    </div>*/}
                    <div>
                        {this.state.addCatValue}
                    </div>
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
                                                <CheckButton text="Show more"/>
                                            </div>
                                            <div className="col-40">
                                                <SearchBlock placeholderName="Search" />
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
                                        <TodosView todosView={this.state.todosView} todos={this.state.todos} />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
                <Modal
                    modal={this.state.modal}
                    modalClose={this.modalClose}
                    modalHidden={this.state.modalHidden}
                    modalAdd={this.state.modalAdd}
                    modalEditCat={this.state.modalEditCat}
                    modalEditTodo={this.state.modalEditTodo}
                    addSubCategory={this.addSubCategory}
                    modalName={this.state.modalName}
                    modalNameChange={this.modalNameChange}
                />
            </React.Fragment>
        );
    }
}

export default App;
