import React from 'react';
import TodosTree from "../todos/tree";

export const View = (props) => {
    const { todos, select, selectOpen, selectCategory } = props;
    const selectedName = todos.selected ? todos.selected.name : 'Move to category';
    return (
        <div className={select.class} onClick={selectOpen}>
            <div className="select__title">
                { selectedName }
            </div>
            <div className="select__body">
                <TodosTree
                    todos={todos}
                    selectCategory={selectCategory}
                />
            </div>
        </div>
    )
}