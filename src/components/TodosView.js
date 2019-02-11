import React, { Component } from 'react';
import Button from './Button';
import '../assets/core_blocks/TodosView.css';

class TodosView extends Component {
    render() {
        let todosView, todosFetch;
        function todoClass(el) {
            let hidden = el.hidden ? 'hidden' : '';
            let modalClass = `todo-list__item todo ${hidden}`;
            return modalClass;
        };
        if (this.props.todosView && this.props.todosView.items) {
            todosFetch = this.props.todosView.items.map(el =>
                <li key={el.id} className={todoClass(el)}>
                    <div className="r ai-c">
                        <div className="col-10 t-c">
                            <input className="todo__checkbox" type="checkbox" checked={el.checked} readOnly/>
                        </div>
                        <div className="col-80">
                            <div className="todo__name">
                                {el.name}
                            </div>
                        </div>
                        <div className="col-10 t-c">
                            <div className="todo__button" onClick={(event) => this.props.modalOpen('edittodo', el, event)}>
                                <Button preset="edit" />
                            </div>
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