import React from 'react';

export const View = (props) => {
    const { todosView } = props;
    return (
        <ul className="todo-list">
            { todosView }
        </ul>
    );
}