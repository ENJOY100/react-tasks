import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './modal-view';

import './modal.scss';

import { modalCloseAction } from "../../store/modal/actions";

export class Modal extends Component {

    constructor() {
        super();
        this.state = {
            el: React.createRef()
        }
    }

    clickOver = (e) => {
        const { modal, modalCloseAction } = this.props;
        if (!this.state.el.current.contains(e.target) && !modal.hidden) {
            modalCloseAction();
        }
    }

    render() {
        const {
            modal,
            modalOpen,
            modalCloseAction
        } = this.props;

        return (
            <View
                el={this.state.el}
                clickOver={this.clickOver}
                modal={modal}
                modalOpen={modalOpen}
                modalClose={modalCloseAction}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modal: state.modal
    };
}

const mapDispatchToProps = {
    modalCloseAction
}

export const container = connect(mapStateToProps, mapDispatchToProps)(Modal);

Modal.propTypes = {
    modal: PropTypes.shape({
        hidden: PropTypes.bool
    }),
    modalCloseAction: PropTypes.func,
    modalOpen: PropTypes.func,
}
