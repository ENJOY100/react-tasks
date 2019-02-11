import React, { Component } from 'react';
import '../assets/core_blocks/Modal.css'

class Modal extends Component {
    render() {
        let hidden = this.props.modalHidden ? 'hidden' : '';
        let add = this.props.modalAdd ? 'add' : '';
        let editCat = this.props.modalEditCat ? 'editcat' : '';
        let editTodo = this.props.modalEditTodo ? 'edittodo' : '';
        let modalClass = `modal-wrap ${hidden} ${add} ${editCat} ${editTodo}`;

        /*КОРОЧЕ, добавить сюда TREE компонент, пошаманить со стилями*/
        let todos = this.props.todos;
        todos = todos.map((el) => {
            let catEL = el;
            let childrenCat = todos.filter((el) => {
                return el.parentID == catEL.id;
            });
            childrenCat = childrenCat.map(el =>
                <li value="">
                    { el.name }
                </li>
            );
            return (
                <li value="">
                    {el.name}
                    <ul>
                        { childrenCat }
                    </ul>
                </li>
            );
        });

        return (
            <React.Fragment>
                <div className={modalClass}>
                    <div className="modal" ref={this.props.modal}>
                        <div className="modal__close" onClick={this.props.modalClose}>×</div>
                        <div className="modal__head">
                            <span className="modal__head--title modal__head--add">Add Category</span>
                            <span className="modal__head--title modal__head--editcat">Edit category</span>
                            <span className="modal__head--title modal__head--edittodo">Edit TODO</span>
                        </div>

                        <div className="modal__body">

                            <div className="modal__line">
                                <div className="r">
                                    <div className="col-30">
                                        <label>Name:</label>
                                    </div>
                                    <div className="col-70">
                                        <input value={this.props.modalName} onChange={this.props.modalNameChange} type="text" className="modal__input modal__input--name" />
                                    </div>
                                </div>
                            </div>

                            { this.props.modalEditTodo &&
                                <div className="modal__line">
                                    <input className="modal__checkbox" type="checkbox" defaultChecked={this.props.modalCheck} onChange={this.props.modalCheckChange} readOnly={this.props.modalCheck}/>
                                </div>
                            }

                            { this.props.modalEditTodo &&
                            <div className="modal__line">
                                <ul name="" id="">
                                    {todos}
                                </ul>
                            </div>
                            }

                            {/*<div className="modal__line">
                                <div className="r">
                                    <div className="col-30">
                                        <label className="modal__label">Дата:</label>
                                    </div>
                                    <div className="col-70">
                                        <input value={this.props.task_params_date} onChange={this.props.taskDateChange} type="text" className="modal__input modal__input--date" />
                                    </div>
                                </div>
                            </div>*/}

                            <div className="modal__line">

                                { this.props.modalAdd &&
                                <button className="btn btn--action btn--save" onClick={this.props.addSubCategory}>Сохранить</button>
                                }
                                { this.props.modalEditCat &&
                                <button className="btn btn--action btn--change" onClick={this.props.editCategory}>Изменить</button>
                                }
                                { this.props.modalEditTodo &&
                                <button className="btn btn--action btn--change" onClick={this.props.editTodo}>Изменить</button>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;