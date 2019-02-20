import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from './modal-view';

import './modal.scss';

export class Modal extends Component {

    clickOver = (e) => {
        const { modal, modalClose } = this.props;
        if (!modal.el.current.contains(e.target) && !modal.hidden) {
            modalClose();
        }
    }

    render() {
        const {
            todos,
            input,
            modal,
            modalClose,
            modalOpen,
            stateUpdateTodos
        } = this.props;

        return (
            <View
                todos={todos}
                input={input}
                modal={modal}
                modalClose={modalClose}
                clickOver={this.clickOver}
                stateUpdateTodos={stateUpdateTodos}
                modalOpen={modalOpen}
            />
        )
    }
}

Modal.propTypes = {
    todos: PropTypes.object,
    input: PropTypes.object,
    modal: PropTypes.object,
    modalClose: PropTypes.func,
    modalOpen: PropTypes.func,
    stateUpdateTodos: PropTypes.func
}
