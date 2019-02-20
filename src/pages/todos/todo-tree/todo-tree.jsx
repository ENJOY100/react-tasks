import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodosTreeItem from './todo-tree-item';
import './tree.scss';

export class TodosTree extends Component {
    render() {
        const {
            todos,
            showTodos,
            modalOpen,
            selectEvent,
            stateUpdateTodos
        } = this.props;

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
                    modalOpen={modalOpen}
                    selectEvent={selectEvent}
                    stateUpdateTodos={stateUpdateTodos}
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

TodosTree.propTypes = {
    todos: PropTypes.object,
    showTodos: PropTypes.func,
    modalOpen: PropTypes.func,
    selectEvent: PropTypes.func,
    stateUpdateTodos: PropTypes.func
}