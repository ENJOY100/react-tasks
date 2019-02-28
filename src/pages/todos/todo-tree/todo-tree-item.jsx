import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './todo-tree-item-view';

import { getDeletedTodos } from '../../../utils/get-deleted-todos';
import { updateTodosAllAction, updateTodosFetchAction } from '../../../store/todos/actions';

import './tree.scss';

class TodosTreeItem extends Component {

    openList = (category, event) => {
        const { todos, updateTodosFetchAction } = this.props;
        const id = todos.fetch.indexOf(category);

        todos.fetch[id].opened = !todos.fetch[id].opened;

        updateTodosFetchAction(todos.fetch);
        event.stopPropagation();
    }

    deleteCategory = (category, event) => {
        this.props.updateTodosAllAction(getDeletedTodos(this.props.todos, category));
        event.stopPropagation();
    }

    render() {
        const {
            category,
            todos,
            showTodos,
            modalOpen,
            selectEvent
        } = this.props;

        let childrenCategories = todos.fetch.filter(childCategory =>
            childCategory.parentID === category.id
        );

        const todosState = category.opened && childrenCategories.length > 0 ? true : false;

        let treeClickEvent = showTodos ? showTodos : selectEvent;

        const todosTreeItemClass = classNames('tree-list__item', { 'opened': todosState }, { 'tree-list__select-item': !showTodos });

        childrenCategories = childrenCategories.map(childCategory =>
            <TodosTreeItem
                key={childCategory.id}
                parentEl={category}
                category={childCategory}
                todos={todos}
                showTodos={showTodos}
                modalOpen={modalOpen}
                selectEvent={selectEvent}
                updateTodosAllAction={this.props.updateTodosAllAction}
                updateTodosFetchAction={this.props.updateTodosFetchAction}
            />
        );

        return (
            <View
                key={category.id}
                category={category}
                modalOpen={modalOpen}
                deleteCategory={this.deleteCategory}
                openList={this.openList}
                todosTreeItemClass={todosTreeItemClass}
                childrenCategories={childrenCategories}
                treeClickEvent={treeClickEvent}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

const mapDispatchToProps = {
    updateTodosAllAction,
    updateTodosFetchAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosTreeItem);

TodosTreeItem.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number
    }),
    todos: PropTypes.shape({
        fetch: PropTypes.array
    }),
    showTodos: PropTypes.func,
    modalOpen: PropTypes.func,
    selectEvent: PropTypes.func,
    updateTodosAllAction: PropTypes.func,
    updateTodosFetchAction: PropTypes.func
}