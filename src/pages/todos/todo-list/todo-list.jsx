import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFilteredTodoItemsSelector } from '../../../store/todos/reducers';

import TodoItem from './todo-item';

import './todo-list.scss';

const mapStateToProps = (state, props) => {
	return {
		filtered_todos: getFilteredTodoItemsSelector(state, props) || [],
		show_value: state.todos.show_value,
		search_value: state.todos.search_value,
	};
};

export const TodoList = connect(mapStateToProps)(
	class extends PureComponent {
		static propTypes = {
			filtered_todos: PropTypes.array,
			search_value: PropTypes.string,
			show_value: PropTypes.bool,
		};

		render() {
			let {
				modalOpen,
				filtered_todos,
				show_value,
				search_value,
			} = this.props;

			return (
				<ul className="todo-list">
					{
						(filtered_todos = filtered_todos.map(todo_item => (
							<TodoItem
								key={todo_item.id}
								todo_item={todo_item}
								modalOpen={modalOpen}
							/>
						)))
					}
					{!filtered_todos.length &&
						getMessage(show_value, search_value)}
				</ul>
			);
		}
	}
);

function getMessage(show_value, search_value) {
	if (search_value || show_value) {
		return 'No match found';
	}
}
