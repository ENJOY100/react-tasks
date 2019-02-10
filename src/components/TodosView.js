import React, { Component } from 'react';
import Button from './Button';
import '../assets/core_blocks/TodosView.css';

class TodosView extends Component {
    render() {
        let todosView, todosFetch;
        if (this.props.todosView && this.props.todosView.items) {
            todosFetch = this.props.todosView.items.map(el =>
                <li key={el.id} className="todo-list__item todo">
                    <div className="r ai-c">
                        <div className="col-10 t-c">
                            <input className="todo__checkbox" type="checkbox" checked={el.checked}/>
                        </div>
                        <div className="col-80">
                            <div className="todo__name">
                                {el.name}
                            </div>
                        </div>
                        <div className="col-10 t-c">
                            <Button preset="edit" />
                        </div>
                    </div>
                </li>
            );

            todosView = todosFetch.length > 0 ? todosFetch : "TODOS is NULL, please ADD";
        }
        return (
            <ul className="todo-list">
                { todosView }
            </ul>
        )
    }
}

export default TodosView;