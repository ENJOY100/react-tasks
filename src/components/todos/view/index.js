import React, { Component } from 'react';
import TodoItem from '../todo-item';
import './view.scss';

export default class TodosView extends Component {
    render() {
        let { todosView } = this.props;
        const { showDoneValue, searchValue, modalOpen } = this.props;
        let todosFetch;

        if (todosView && todosView.items) {
            if (showDoneValue) {
                todosFetch = todosView.items.filter((el) => {
                    return el.checked;
                });
            } else {
                todosFetch = todosView.items;
            }
        }

        if (searchValue && todosView && todosView.items) {
            todosFetch = todosView.items.filter((el) => {
                return el.name.indexOf(searchValue) !== -1;
            });
        }

        if (todosView && todosView.items) {
            todosFetch = todosFetch.map(el =>
                <TodoItem
                    key={el.id}
                    el={el}
                    modalOpen={modalOpen}
                />
            );

            let alertText;
            if (!todosFetch.length && searchValue || showDoneValue) {
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