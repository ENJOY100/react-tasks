import React, { Component } from 'react';
import Button from './Button';
import '../assets/core_blocks/TodosView.css';

class TodosView extends Component {
    render() {
        let todosView, todosFetch;

        if (this.props.todosView && this.props.todosView.items) {
            if (this.props.showDoneValue) {
                todosFetch = this.props.todosView.items.filter((el) => {
                    return el.checked;
                });
            } else {
                todosFetch = this.props.todosView.items;
            }
        }

        if (this.props.searchValue && this.props.todosView && this.props.todosView.items) {
            todosFetch = this.props.todosView.items.filter((el) => {
                return el.name.indexOf(this.props.searchValue) !== -1;
            });
        }

        if (this.props.todosView && this.props.todosView.items) {
            todosFetch = todosFetch.map(el =>
                <li key={el.id} className="todo-list__item todo">
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

            let alertText;
            if (!todosFetch.length && this.props.searchValue || this.props.showDoneValue) {
                alertText = 'No match found';
            } else if (!todosFetch.length) {
                alertText = 'Todos is null, please add';
            }

            todosView = todosFetch.length > 0 ? todosFetch : alertText;

        }
        return (
            <ul className="todo-list">
                { todosView }
            </ul>
        )
    }
}

export default TodosView;