import React, { Component } from 'react';
import { View } from './tree-item';

import '../tree/tree.scss';

export default class TodosTreeItem extends Component {
    render() {
        const { todos, el, showTodos, selectCategory, deleteCategory, modalOpen, openList } = this.props;
        let treeClickEvent, todosTreeItemClass;

        let childrenCat = todos.fetch.filter((item) => {
            return item.parentID === el.id;
        });

        const todosState = el.opened && childrenCat.length > 0 ? 'opened' : '';

        if (showTodos) {
            treeClickEvent = showTodos;
            todosTreeItemClass = `tree-list__item ${todosState}`;
        } else {
            treeClickEvent = selectCategory;
            todosTreeItemClass = `tree-list__item tree-list__select-item`;
        }

        childrenCat = childrenCat.map(el =>
            <TodosTreeItem
                key={el.id}
                el={el}
                todos={todos}
                parentEl={el}
                showTodos={showTodos}
                deleteCategory={deleteCategory}
                modalOpen={modalOpen}
                openList={openList}
                selectCategory={selectCategory}
            />
        )

        return (
            <View
                key={this.props.el.id}
                el={this.props.el}
                deleteCategory={this.props.deleteCategory}
                modalOpen={this.props.modalOpen}
                openList={this.props.openList}
                todosTreeItemClass={todosTreeItemClass}
                childrenCat={childrenCat}
                treeClickEvent={treeClickEvent}
            />
        )
    }
}