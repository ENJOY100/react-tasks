import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TodoItem from './todo-item';

import './todo-list.scss';

const mapStateToProps = state => {
	return {
		todos: state.todos,
	};
};

export const TodoList = connect(mapStateToProps)(
	class extends Component {
		static propTypes = {
			todos: PropTypes.shape({
				filtered_todos: PropTypes.array,
				selected_category: PropTypes.object,
				search_value: PropTypes.string,
				show_value: PropTypes.bool
			}),
		};

		render() {
			let {
				todos,
				todos: { filtered_todos = [] },
				modalOpen,
			} = this.props;

			if (filtered_todos) {
				filtered_todos = filtered_todos.map(todo_item => (
					<TodoItem
						key={todo_item.id}
						todo_item={todo_item}
						modalOpen={modalOpen}
					/>
				));
			}

			return (
				<ul className="todo-list">
					{filtered_todos || getMessage(todos)}
				</ul>
			);
		}
	}
);

function getMessage(todos) {
	if ((!todos.filtered_todos && todos.search_value) || todos.show_value) {
		return 'No match found';
	}
	if (todos.selected_category && !todos.filtered_todos) {
		return 'Todos is null, please add';
	}
}
