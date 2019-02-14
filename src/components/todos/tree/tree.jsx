import React from 'react';

export const View = (props) => {
    return (
        <div className="tree">
            <ul className="tree-list">
                { props.todoItems }
            </ul>
        </div>
    )
}