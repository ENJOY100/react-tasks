import React from 'react';
import PropTypes from 'prop-types';
import CheckButton from '../../../components/checkbtn';
import Button from '../../../components/button';

export const View = (props) => {
    const {
        el,
        modalOpen,
        changeEvent,
        checkedValue
    } = props;

    return (
        <li className="todo-list__item todo">
            <div className="r ai-c">
                <div className="col-10 t-c">
                    <CheckButton
                        value={checkedValue}
                        el={el}
                        changeEvent={changeEvent}
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

View.propTypes = {
    el: PropTypes.object,
    modalOpen: PropTypes.func,
    changeEvent: PropTypes.func,
    checkedValue: PropTypes.bool
}