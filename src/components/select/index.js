import React, { Component } from 'react';
import './select.scss';

import TodosTree from "../todos/tree";

export default class Select extends Component {
    constructor() {
        super();
        this.state = {
            selectClass: 'select',
            selectOpened: false,
        }
    }
    selectOpen = () => {
        let { selectOpened, selectClass } = this.state;

        let state = selectOpened;
        state = !state;

        const opened = selectOpened ? 'opened' : '';
        selectClass = `select ${opened}`;

        this.setState({
            selectClass: 'select',
            selectOpened: state,
        });
        this.setState({
            selectClass: selectClass,
        })
    }
    render() {
        const { todos, selectCategory, selectedCategory, selectClass } = this.props;
        const selected = selectedCategory ? selectedCategory.name : 'Move to category';
        return(
            <div className={selectClass} onClick={this.selectOpen}>
                <div className="select__title">
                    { selected }
                </div>
                <div className="select__body">
                    <TodosTree
                        todos={todos}
                        selectCategory={selectCategory}
                    />
                </div>
            </div>
        );
    }
}