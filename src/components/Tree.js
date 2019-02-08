import React, { Component } from 'react';
import '../assets/core_blocks/Tree.css'

import Button from '../components/Button';
import TodosTreeItem from '../components/TodosTreeItem';

class Tree extends Component {
    render() {
        let todoItems = [];
        if (this.props.todos) {
            todoItems = this.props.todos.map(el =>
                <TodosTreeItem
                    key={el.id}
                    el={el}
                    openCategory={this.props.openCategory}
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

export default Tree;