import React, { Component } from 'react';
import '../assets/core_blocks/Select.css';

import TodosTree from "./TodosTree";

class Select extends Component {
    constructor() {
        super();
        this.state = {
            selectClass: 'select',
            selectOpened: false,
        }
    }
    selectOpen = () => {
        let opened, selectClass, state;
        state = this.state.selectOpened;
        state = !state;
        this.setState({
            selectClass: 'select',
            selectOpened: state,
        });
        opened = !this.state.selectOpened ? 'opened' : '';
        selectClass = `select ${opened}`;
        this.setState({
            selectClass: selectClass,
        })
    }
    render() {
        let selected = this.props.selectedCategory ? this.props.selectedCategory.name : 'Move to category';
        return(
            <div className={this.state.selectClass} onClick={this.selectOpen}>
                <div className="select__title">
                    { selected }
                </div>
                <div className="select__body">
                    <TodosTree
                        todos={this.props.todos}
                        selectCategory={this.props.selectCategory}
                    />
                </div>
            </div>
        );
    }
}

export default Select;