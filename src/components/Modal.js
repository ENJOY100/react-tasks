import React, { Component } from 'react';
import '../assets/core_blocks/Modal.css'

class Modal extends Component {
    render() {
        let hidden = this.props.modalHidden ? 'hidden' : '';
        let add = this.props.modalAdd ? 'add' : '';
        let editCat = this.props.modalEditCat ? 'editcat' : '';
        let editTodo = this.props.modalEditTodo ? 'edittodo' : '';
        let modalClass = `modal-wrap ${hidden} ${add} ${editCat} ${editTodo}`;
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
                                        <label>Наименование:</label>
                                    </div>
                                    <div className="col-70">
                                        <input value={this.props.modalName} onChange={this.props.modalNameChange} type="text" className="modal__input modal__input--name" />
                                    </div>
                                </div>
                            </div>

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
                                <button className="btn btn--action btn--change" onClick={this.props.editCat}>Изменить</button>
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