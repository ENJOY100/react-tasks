import React from 'react';
import TodoItem from '../pages/todos/todo-list/todo-item';

export const getFilteredTodos = (todos, input, slug, open, update, props) => {
    const historyCategory = todos.fetch.find(el => el.id === parseFloat(slug));

    if (!historyCategory) {
        props.history.push(`/404`);
        return;
    }

    let todosFetch, todosList;

    todosList = historyCategory;

    if (todosList && todosList.items) {
        if (input.showValue) {
            todosFetch = todosList.items.filter((el) => {
                return el.checked;
            });
        } else {
            todosFetch = todosList.items;
        }
    }

    if (input.searchValue && todosList && todosList.items) {
        todosFetch = todosList.items.filter((el) => {
            return el.name.includes(input.searchValue);
        });
    }

    if (todosList && todosList.items) {
        todosFetch = todosFetch.map(el =>
            <TodoItem
                key={el.id}
                el={el}
                todos={todos}
                modalOpen={open}
                stateUpdateTodos={update}
            />
        )
    }

    todosList = todosFetch.length > 0 ? todosFetch : null;

    return todosList;
}