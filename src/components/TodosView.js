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

   /*     if (this.props.showDoneValue) {
            console.log('testValue is 1');
        } else {
            console.log('testValue is 0');
        }*/

        if (this.props.todosView && this.props.todosView.items) {
            // не работает, хз почему (ПОТОМУ ЧТО showDown!!!!!!!! не showDone!!!
            if (this.props.showDoneValue === 'show') {
                console.log('da1');
                todosFetch = this.props.todosView.items.filter((el) => {
                    return el.checked;
                });
            } else {
                console.log('da2')
                todosFetch = this.props.todosView.items;
            }
        }

        if (this.props.searchValue && this.props.todosView && this.props.todosView.items) {
            todosFetch = this.props.todosView.items.filter((el) => {
                return el.name.indexOf(this.props.searchValue) !== -1;
            });
        }

        /*if (this.props.showDownValue && this.props.todosView && this.props.todosView.items) {
            alert('da');
            todosFetch = this.props.todosView.items.filter((el) => {
                return el.checked;
            });
        } else if (!this.props.showDownValue && this.props.todosView && this.props.todosView.items) {
            console.log('da2')
            todosFetch = this.props.todosView.items;
        }*/

        if (this.props.todosView && this.props.todosView.items) {
            todosFetch = todosFetch.map(el =>
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

            let alertText;
            if (!todosFetch.length && this.props.searchValue) {
                alertText = 'No match found';
            } else if (!todosFetch.length) {
                alertText = 'Todos is null, please add';
            }

            todosView = todosFetch.length > 0 ? todosFetch : alertText;

        }
        return (
            <ul className="todo-list">
                <li>{this.props.showDoneValue}</li>
                { todosView }
            </ul>
        )
    }
}

export default TodosView;