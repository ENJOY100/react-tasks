import React from 'react';

export const View = (props) => {
    return (
        <ul className="todo-list">
            { props.todosView }
        </ul>
    )
}