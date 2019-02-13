import React, { Component } from 'react';
import { View } from './tree';
import './tree.scss'

import TodosTreeItem from '../tree-item';

export default class TodosTree extends Component {
    render() {
        const { todos, showTodos, deleteCategory, modalOpen, openList, selectCategory } = this.props;
        let todoItems = [];
        if (todos.fetch) {
            todoItems = todos.fetch.filter((el) => {
                return el.parentID == null;
            });
            todoItems = todoItems.map(el =>
                <TodosTreeItem
                    key={el.id}
                    el={el}
                    todos={todos}
                    showTodos={showTodos}
                    deleteCategory={deleteCategory}
                    modalOpen={modalOpen}
                    openList={openList}
                    selectCategory={selectCategory}
                />
            );
        }
        return (
            <View todoItems={todoItems}/>
        )
    }
}