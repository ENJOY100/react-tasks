import React, { Component } from 'react';
import './modal.scss'

import Select from '../select';
import ModalTitle from '../../utils/modal-title'

export default class Modal extends Component {
    render() {
        const {
            modalHidden,
            modalStatus,
            modal ,
            modalClose,
            modalNameValue,
            changeEvent,
            inputName,
            modalCheckValue,
            checkName,
            todos,
            openList,
            selectCategory,
            selectedCategory,
            addSubCategory,
            editCategory,
            editTodo
        } = this.props;

        const hidden = modalHidden ? 'hidden' : '';
        const modalClass = `modal-wrap ${hidden}`;

        return (
            <>
                <div className={modalClass}>
                    <div className="modal" ref={modal}>
                        <div className="modal__close" onClick={modalClose}>×</div>
                        <div className="modal__head">
                            <span className="modal__title">
                                <ModalTitle modalStatus={modalStatus} />
                            </span>
                        </div>

                        <div className="modal__body">

                            <div className="modal__line">
                                <div className="r ai-c">
                                    <div className="col-30">
                                        <label>Name:</label>
                                    </div>
                                    <div className="col-70">
                                        <input
                                            value={modalNameValue}
                                            onChange={(event) => changeEvent(event, inputName)}
                                            type="text"
                                            className="modal__input modal__input--name"
                                        />
                                    </div>
                                </div>
                            </div>

                            { this.props.modalStatus === 'edit-todo' &&
                                <div className="modal__line">
                                    <label className="modal__label df ai-c">
                                        <input
                                            className="modal__checkbox"
                                            type="checkbox"
                                            defaultChecked={modalCheckValue}
                                            onChange={(event) => changeEvent(event, checkName)}
                                        />
                                        <span className="modal__label-text">Check this todo</span>
                                    </label>
                                </div>
                            }

                            { this.props.modalStatus === 'edit-todo' &&
                                <div className="modal__line">
                                    <Select
                                        todos={todos}
                                        openList={openList}
                                        selectCategory={selectCategory}
                                        selectedCategory={selectedCategory}
                                    />
                                </div>
                            }

                            <div className="modal__line">

                                { modalStatus === 'add' &&
                                    <button className="btn btn--action" onClick={addSubCategory}>Save</button>
                                }
                                { modalStatus === 'edit' &&
                                    <button className="btn btn--action" onClick={editCategory}>Save</button>
                                }
                                { modalStatus === 'edit-todo' &&
                                    <button className="btn btn--action" onClick={editTodo}>Save</button>
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}