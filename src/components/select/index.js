import React, { Component } from 'react';
import './select.scss';

import TodosTree from "../todos/tree";

export default class Select extends Component {
    constructor() {
        super();
        this.state = {
            select: {
                class: 'select',
                opened: false
            }
        }
    }
    selectOpen = () => {
        let { select } = this.state;

        select.opened = !select.opened;

        const opened = select.opened ? 'opened' : '';
        select.class = `select ${opened}`;

        this.setState({
            select: {
                class: select.class,
                opened: select.opened
            }
        });
    }
    render() {
        const { todos, selectCategory } = this.props;
        const selectedName = todos.selected ? todos.selected.name : 'Move to category';
        return(
            <div className={this.state.select.class} onClick={this.selectOpen}>
                <div className="select__title">
                    { selectedName }
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