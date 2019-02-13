import React from 'react';

export const View = (props) => {
    const { todoItems } = props;
    return (
        <div className="tree">
            <ul className="tree-list">
                { todoItems }
            </ul>
        </div>
    );
}