import React, { Component } from 'react';
import Button from './Button';
import '../assets/core_blocks/TodosView.css';

class TodosView extends Component {
    render() {
        return (
            <ul className="todo-list">
                <li className="todo-list__item todo">
                    <div className="r ai-c">
                        <div className="col-10 t-c">
                            <input className="todo__checkbox" type="checkbox"/>
                        </div>
                        <div className="col-80">
                            <div className="todo__name">
                                Todo Item #1
                            </div>
                        </div>
                        <div className="col-10 t-c">
                            <Button preset="edit" />
                        </div>
                    </div>
                </li>
                <li className="todo-list__item todo">
                    <div className="r ai-c">
                        <div className="col-10 t-c">
                            <input className="todo__checkbox" type="checkbox"/>
                        </div>
                        <div className="col-80">
                            <div className="todo__name">
                                Todo Item #2
                            </div>
                        </div>
                        <div className="col-10 t-c">
                            <Button preset="edit" />
                        </div>
                    </div>
                </li>
            </ul>
        )
    }
}

export default TodosView;