import React, { Component } from 'react';
import '../assets/core_blocks/TodosTree.css'

import TodosTreeItem from '../components/TodosTreeItem';

class TodosTree extends Component {
    render() {
        let todoItems = [];
        if (this.props.todos) {
            todoItems = this.props.todos.filter((el) => {
                return el.parentID == null;
            });
            todoItems = todoItems.map(el =>
                <TodosTreeItem
                    key={el.id}
                    el={el}
                    todos={this.props.todos}
                    showTodos={this.props.showTodos}
                    deleteCategory={this.props.deleteCategory}
                    modalOpen={this.props.modalOpen}
                    modalAdd={this.props.modalAdd}
                    openList={this.props.openList}
                    selectCategory={this.props.selectCategory}
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

export default TodosTree;