import React, { Component } from 'react';
import TodoItem from '../todo-item';
import { View } from './view';
import './view.scss';

export default class TodosView extends Component {
    render() {
        const { todos, input, modalOpen, singleTodoCheck } = this.props;
        let todosFetch, todosView;

        todosView = todos.view;

        if (todosView && todosView.items) {
            if (input.showValue) {
                todosFetch = todosView.items.filter((el) => {
                    return el.checked;
                });
            } else {
                todosFetch = todosView.items;
            }
        }

        if (input.searchValue && todosView && todosView.items) {
            todosFetch = todosView.items.filter((el) => {
                return el.name.indexOf(input.searchValue) !== -1;
            });
        }

        if (todosView && todosView.items) {
            todosFetch = todosFetch.map(el =>
                <TodoItem
                    key={el.id}
                    el={el}
                    modalOpen={modalOpen}
                    singleTodoCheck={singleTodoCheck}
                />
            );

            let alertText;
            if (!todosFetch.length && input.searchValue || input.showValue) {
                alertText = 'No match found';
            } else if (!todosFetch.length) {
                alertText = 'Todos is null, please add';
            }

            todosView = todosFetch.length > 0 ? todosFetch : alertText;

        }
        return (
            <View todosView={todosView} />
        )
    }
}