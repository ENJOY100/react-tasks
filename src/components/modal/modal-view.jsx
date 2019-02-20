import React from 'react';
import PropTypes from 'prop-types';
import TodosChanger from '../todos-changer';
import classNames from 'classnames';

export const View = (props) => {
    const {
        todos,
        input,
        modal,
        modalClose,
        modalOpen,
        clickOver,
        stateUpdateTodos
    } = props;

    return (
        <div className={classNames('modal-wrap', {'hidden': modal.hidden})} onClick={clickOver}>
            <div className="modal" ref={modal.el}>
                <div className="modal__close" onClick={modalClose}>×</div>
                { modal.status &&
                    <TodosChanger
                        status={modal.status}
                        todos={todos}
                        input={input}
                        modalClose={modalClose}
                        modalOpen={modalOpen}
                        stateUpdateTodos={stateUpdateTodos}
                    />
                }
            </div>
        </div>
    )
}

View.propTypes = {
    todos: PropTypes.object,
    input: PropTypes.object,
    modal: PropTypes.object,
    modalClose: PropTypes.func,
    modalOpen: PropTypes.func,
    clickOver: PropTypes.func,
    stateUpdateTodos: PropTypes.func
}
