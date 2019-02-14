import React from 'react';

import Select from '../select';
import GetModalTitle from '../../utils/getModalTitle';

export const View = (props) => {
    const {
        todos,
        input,
        modal,
        clickEvent,
        modalClose,
        changeEvent,
        clickOver,
        openList,
        inputName,
        checkName,
        selectCategory
    } = props;

    const hidden = modal.hidden ? 'hidden' : '';
    const modalClass = `modal-wrap ${hidden}`;

    return (
        <div className={modalClass} onClick={clickOver}>
            <div className="modal" ref={modal.el}>
                <div className="modal__close" onClick={modalClose}>×</div>
                <div className="modal__head">
                        <span className="modal__title">
                            <GetModalTitle modal={modal} />
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
                                    value={input.modalNameValue}
                                    onChange={(event) => changeEvent(event, inputName)}
                                    type="text"
                                    className="modal__input modal__input--name"
                                />
                            </div>
                        </div>
                    </div>

                    { modal.status === 'edit-todo' &&
                        <div className="modal__line">
                            <label className="modal__label df ai-c">
                                <input
                                    className="modal__checkbox"
                                    type="checkbox"
                                    defaultChecked={input.modalCheckValue}
                                    onChange={(event) => changeEvent(event, checkName)}
                                />
                                <span className="modal__label-text">Check this todo</span>
                            </label>
                        </div>
                    }

                    { modal.status === 'edit-todo' &&
                        <div className="modal__line">
                            <Select
                                todos={todos}
                                openList={openList}
                                selectCategory={selectCategory}
                            />
                        </div>
                    }

                    <div className="modal__line">
                        <button className="btn btn--action" onClick={clickEvent}>Save</button>
                    </div>

                </div>
            </div>
        </div>
    );
}