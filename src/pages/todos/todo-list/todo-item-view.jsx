import React from 'react';
import PropTypes from 'prop-types';

import CheckButton from '../../../components/checkbtn';
import Button from '../../../components/button';

export const View = (props) => {
    const {
        todo,
        value,
        modalOpen,
        changeEvent
    } = props;

    return (
        <li className="todo-list__item todo">
            <div className="r ai-c">
                <div className="col-10 t-c">
                    <CheckButton
                        value={value}
                        changeEvent={(event) => changeEvent(event.target.checked, todo)}
                    />
                </div>
                <div className="col-80">
                    <div className="todo__name">
                        { todo.name }
                    </div>
                </div>
                <div className="col-10 t-c">
                    <div className="todo__button" onClick={(event) => modalOpen('edit-todo', todo, event)}>
                        <Button preset="edit" />
                    </div>
                </div>
            </div>
        </li>
    )
}

View.propTypes = {
    todo: PropTypes.shape({
        name: PropTypes.string
    }),
    value: PropTypes.bool,
    modalOpen: PropTypes.func,
    changeEvent: PropTypes.func
}