import React from 'react';
import Button from '../../button';

export const View = (props) => {
    const { el, modalOpen, changeEvent } = props;
    return (
        <li className="todo-list__item todo">
            <div className="r ai-c">
                <div className="col-10 t-c">
                    <input
                        className="todo__checkbox"
                        type="checkbox"
                        checked={el.checked}
                        onChange={(event) => {changeEvent(event, el)}}
                    />
                </div>
                <div className="col-80">
                    <div className="todo__name">
                        {el.name}
                    </div>
                </div>
                <div className="col-10 t-c">
                    <div className="todo__button" onClick={(event) => modalOpen('edit-todo', el, event)}>
                        <Button preset="edit" />
                    </div>
                </div>
            </div>
        </li>
    )
}