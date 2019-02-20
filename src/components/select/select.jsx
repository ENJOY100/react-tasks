import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TodosTree from "../../pages/todos/todo-tree";
import './select.scss';

export class Select extends Component {
    constructor() {
        super();
        this.state = {
            opened: false,
            selected: null
        }
    }
    selectOpen = () => {
        this.setState(prevState => ({
            opened: !prevState.opened
        }));
    }

    selectEvent = (el) => {
        this.setState({
            selected: el
        });
        this.props.updateSelect(el);
    }

    componentWillUnmount() {
        this.setState({
            selected: null
        });
    }

    render() {
        const selectedName = this.state.selected ? this.state.selected.name : 'Move to category';
        return (
            <div className={classNames('select', { 'opened': this.state.opened })} onClick={this.selectOpen}>
                <div className="select__title">
                    { selectedName }
                </div>
                <div className="select__body">
                    <TodosTree
                        todos={this.props.todos}
                        selectEvent={this.selectEvent}
                    />
                </div>
            </div>
        )
    }
}

Select.propTypes = {
    todos: PropTypes.object,
    updateSelect: PropTypes.func
}