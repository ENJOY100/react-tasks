import React, {Component} from 'react';

import InsertBlock from './components/InsertBlock';
import CheckButton from './components/CheckButton';
import SearchBlock from './components/SearchBlock';
import Tree from './components/Tree';
import TodosView from './components/TodosView';

import '../node_modules/aline.css/dist/aline.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './assets/css/core.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            todosView: [],
            addCatValue: '',
            addTodoValue: '',
        }
        /*this.addCategory = this.addCategory.bind(this);*/
        // this.addCatValueChange = this.addCatValueChange.bind(this);
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
        let todos = this.state.todos;
        todos.push({
            id: Math.random(),
            name: this.state.addCatValue,
            children: [],
            items: [],
            opened: false,
        });
        this.setState({
            todos: todos,
        });
        this.addCatValueClear();
    }

    openCategory = (el) => {
        console.log('OpenCategory');
        console.log(this.state.todos.indexOf(el));
        let id = this.state.todos.indexOf(el);
        let todosView = this.state.todos[id];
        this.setState({
            todosView: todosView,
        })
    }

    addTodo = () => {
        console.log('AddTodo');
        let id = this.state.todos.indexOf(this.state.todosView);
        let todos = this.state.todos;
        todos[id].items.push({
            id: Math.random(),
            name: this.state.addTodoValue,
            checked: false,
        })
        this.setState({
            todos: todos,
            todosView: todos[id],
        })
        this.addTodoValueClear();
    }

   /* componentWillMount() {
        console.log(this.state.todos)
    }*/

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log(`Will Update`);
        console.log(this.state.todosView);
    }

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
                                        <Tree todos={this.state.todos}
                                              openCategory={this.openCategory}
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
            </React.Fragment>
        );
    }
}

export default App;
