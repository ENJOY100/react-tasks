import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { View } from './todo-tree-item-view';
import { getDeletedCategory } from '../../../utils/get-deleted-category';

import './tree.scss';

export default class TodosTreeItem extends Component {

    openList = (el, event) => {
        const { todos, stateUpdateTodos } = this.props;
        const id = todos.fetch.indexOf(el);

        todos.fetch[id].opened = !todos.fetch[id].opened;
        stateUpdateTodos(todos);
        event.stopPropagation();
    }

    deleteCategory = (el, event) => {
        const { todos, stateUpdateTodos } = this.props;

        stateUpdateTodos(getDeletedCategory(todos, el));
        event.stopPropagation();
    }

    render() {
        const {
            el,
            todos,
            showTodos,
            modalOpen,
            selectEvent,
            stateUpdateTodos
        } = this.props;

        let childrenCat = todos.fetch.filter((item) => {
            return item.parentID === el.id;
        });

        const todosState = el.opened && childrenCat.length > 0 ? true : false;

        let treeClickEvent = showTodos ? showTodos : selectEvent;

        const todosTreeItemClass = classNames('tree-list__item', { 'opened': todosState }, { 'tree-list__select-item': !showTodos });

        childrenCat = childrenCat.map(el =>
            <TodosTreeItem
                key={el.id}
                parentEl={el}
                el={el}
                todos={todos}
                showTodos={showTodos}
                modalOpen={modalOpen}
                selectEvent={selectEvent}
                stateUpdateTodos={stateUpdateTodos}
            />
        )

        return (
            <View
                key={this.props.el.id}
                el={el}
                deleteCategory={this.deleteCategory}
                modalOpen={modalOpen}
                openList={this.openList}
                todosTreeItemClass={todosTreeItemClass}
                childrenCat={childrenCat}
                treeClickEvent={treeClickEvent}
            />
        )
    }
}

TodosTreeItem.propTypes = {
    el: PropTypes.object,
    todos: PropTypes.object,
    showTodos: PropTypes.func,
    modalOpen: PropTypes.func,
    selectEvent: PropTypes.func,
    stateUpdateTodos: PropTypes.func
}