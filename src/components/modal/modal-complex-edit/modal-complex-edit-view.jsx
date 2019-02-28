import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../select';
import CheckButton from '../../checkbtn';

import { getModalTitle as Title } from '../../../utils/get-modal-title';

export const View = (props) => {

    const {
        status,
        value,
        checked,
        checkedChangeEvent,
        inputChangeEvent,
        handleKeyUp,
        updateSelect,
        clickEvent
    } = props;

    return (
        <React.Fragment>
            <div className="modal__head">
                <div className="modal__title">
                    <Title status={status}/>
                </div>
            </div>

            <div className="modal__body">

                <div className="modal__line">
                    <div className="r ai-c">
                        <div className="col-30">
                            <label>Name:</label>
                        </div>
                        <div className="col-70">
                            <input
                                value={value}
                                onChange={inputChangeEvent}
                                type="text"
                                className="modal__input modal__input--name"
                                onKeyUp={handleKeyUp}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal__line">
                    <CheckButton
                        value={checked}
                        changeEvent={checkedChangeEvent}
                        text="Check this todo"
                    />
                </div>

                <div className="modal__line">
                    <Select
                        updateSelect={updateSelect}
                    />
                </div>

                <div className="modal__line mt-10">
                    <button className="btn btn--action" onClick={clickEvent}>Save</button>
                </div>

            </div>
        </React.Fragment>
    )
}

View.propTypes = {
    todos: PropTypes.object,
    status: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    checkedChangeEvent: PropTypes.func,
    inputChangeEvent: PropTypes.func,
    handleKeyUp: PropTypes.func,
    updateSelect: PropTypes.func,
    clickEvent: PropTypes.func
}