import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './todo-item-view';

import { changeTodoItemAsyncAction } from '../../../store/todos/actions';

import './todo-item.scss';

const mapDispatchToProps = {
	changeTodoItemAsyncAction,
};

const TodoItem = connect(
	null,
	mapDispatchToProps
)(
	class TodoItem extends PureComponent {
		static propTypes = {
			todo_item: PropTypes.shape({
				checked: PropTypes.bool,
			}),
			modalOpen: PropTypes.func,
		};

		singleTodoCheck = (value, todo_item) => {
			const payload = {
				...todo_item,
				checked: value,
			};
			this.props.changeTodoItemAsyncAction(payload);
		};

		render() {
			return (
				<View
					key={this.props.todo_item.id}
					todo_item={this.props.todo_item}
					value={this.props.todo_item.checked}
					modalOpen={this.props.modalOpen}
					changeEvent={this.singleTodoCheck}
				/>
			);
		}
	}
);

export default TodoItem;
