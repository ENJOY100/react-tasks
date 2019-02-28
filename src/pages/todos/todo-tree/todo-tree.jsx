import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodosTreeItem from './todo-tree-item';

import './tree.scss';

class TodosTree extends Component {
    render() {
        const {
            todos: { fetch = [] },
            showTodos,
            modalOpen,
            selectEvent
        } = this.props;

        const categories = fetch.filter(category =>
            category.parentID == null
        );

        return (
            <div className="tree">
                <ul className="tree-list">
                    { categories.map(category =>
                        <TodosTreeItem
                            key={category.id}
                            category={category}
                            showTodos={showTodos}
                            modalOpen={modalOpen}
                            selectEvent={selectEvent}
                        />
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

export const container = connect(mapStateToProps)(TodosTree);

TodosTree.propTypes = {
    todos: PropTypes.shape({
        fetch: PropTypes.array
    }),
    showTodos: PropTypes.func,
    modalOpen: PropTypes.func,
    selectEvent: PropTypes.func
}