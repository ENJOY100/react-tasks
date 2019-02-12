import React, { Component } from 'react';
import './tree.scss'

import TodosTreeItem from '../tree-item';

export default class TodosTree extends Component {
    render() {
        const { todos, showTodos, deleteCategory, modalOpen, modalAdd, openList, selectCategory } = this.props;
        let todoItems = [];
        if (todos) {
            todoItems = todos.filter((el) => {
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
                    modalAdd={modalAdd}
                    openList={openList}
                    selectCategory={selectCategory}
                />
            );
        }
        return (
            <div className="tree">
                <ul className="tree-list">
                    { todoItems }
                </ul>
            </div>
        )
    }
}