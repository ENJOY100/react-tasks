import React, { Component } from 'react';
import Button from '../../button';
import './todo-item.scss';

export default class TodoItem extends Component {
    render() {
        const { el, modalOpen } = this.props;
        return (
            <li className="todo-list__item todo">
                <div className="r ai-c">
                    <div className="col-10 t-c">
                        <input className="todo__checkbox" type="checkbox" checked={el.checked} readOnly/>
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
}