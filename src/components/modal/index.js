import React, { Component } from 'react';
import { View } from './modal';

import './modal.scss';

export default class Modal extends Component {

    clickOver = (e) => {
        const { modal, modalClose } = this.props;

        if (!modal.el.current.contains(e.target) && !modal.hidden) {
            modalClose();
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            this.clickEvent();
        }
    }

    clickEvent = () => {
        const { addSubCategory, editCategory, editTodo, modal } = this.props;
        const updateEvent = () => {
            switch (modal.status) {
                case 'add': {
                    return addSubCategory();
                }
                case 'edit': {
                    return editCategory();
                }
                case 'edit-todo': {
                    return editTodo();
                }
            }
        }
        return updateEvent();
    }

    changeEvent = (event, name) => {
        this.props.inputValueHandler(event, name);
    }

    render() {
        return (
            <View
                todos={this.props.todos}
                input={this.props.input}
                modal={this.props.modal}
                modalClose={this.props.modalClose}
                openList={this.props.openList}
                selectCategory={this.props.selectCategory}
                clickEvent={this.clickEvent}
                changeEvent={this.changeEvent}
                clickOver={this.clickOver}
                inputName={this.props.inputName}
                checkName={this.props.checkName}
                handleKeyPress={this.handleKeyPress}
            />
        );
    }
}