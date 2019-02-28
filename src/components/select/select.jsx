import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodosTree from "../../pages/todos/todo-tree";

import './select.scss';

class Select extends Component {
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

    selectEvent = (value) => {
        this.setState({
            selected: value
        });
        this.props.updateSelect(value);
    }

    render() {
        const selectedName = this.state.selected ? this.state.selected.name : 'Move to category';
        return (
            <div className={classNames('select', { 'opened': this.state.opened })} onClick={this.selectOpen}>
                <div className="select__title">
                    { selectedName }
                </div>
                { this.props.todos &&
                    <div className="select__body">
                        <TodosTree
                            todos={this.props.todos}
                            selectEvent={this.selectEvent}
                        />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

export const container = connect(mapStateToProps)(Select);

Select.propTypes = {
    todos: PropTypes.object,
    updateSelect: PropTypes.func
}