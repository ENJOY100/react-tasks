import React, { Component } from 'react';
import Button from './Button';
import '../assets/core_blocks/TodoItem.css';

class TodoItem extends Component {
    render() {
        return (
            <li className="todo-list__item todo">
                <div className="r ai-c">
                    <div className="col-10 t-c">
                        <input className="todo__checkbox" type="checkbox" checked={this.props.el.checked} readOnly/>
                    </div>
                    <div className="col-80">
                        <div className="todo__name">
                            {this.props.el.name}
                        </div>
                    </div>
                    <div className="col-10 t-c">
                        <div className="todo__button" onClick={(event) => this.props.modalOpen('edittodo', this.props.el, event)}>
                            <Button preset="edit" />
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default TodoItem;