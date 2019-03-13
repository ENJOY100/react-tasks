import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './edit-todo-modal-view';

import { changeTodoItemAsyncAction } from '../../../store/todos/actions';

const mapDispatchToProps = {
	changeTodoItemAsyncAction,
};

export const EditTodoModal = connect(
	null,
	mapDispatchToProps
)(
	class extends Component {
		static propTypes = {
			todo_item: PropTypes.shape({
				name: PropTypes.string,
				checked: PropTypes.bool,
			}),
			changeTodoItemAsyncAction: PropTypes.func,
		};

		constructor(props) {
			super(props);
			this.state = {
				name: props.todo_item.name || '',
				checked: props.todo_item.checked,
				category_id: props.todo_item.category_id || null,
			};
		}

		checkedChangeEvent = event => {
			this.setState({
				checked: event.target.checked,
			});
		};

		inputChangeEvent = event => {
			this.setState({
				name: event.target.value,
			});
		};

		handleKeyUp = event => {
			if (event.key === 'Enter') {
				this.editTodo();
			}
		};

		editTodo = () => {
			const { name, checked, category_id } = this.state;
			if (!name) return;
			const todo_item = {
				...this.props.todo_item,
				name,
				checked,
				category_id,
			};
			this.props.changeTodoItemAsyncAction(todo_item, true);
		};

		updateSelect = value => {
			this.setState({
				category_id: value.id,
			});
		};

		render() {
			return (
				<View
					value={this.state.name}
					checked={this.state.checked}
					inputChangeEvent={this.inputChangeEvent}
					checkedChangeEvent={this.checkedChangeEvent}
					handleKeyUp={this.handleKeyUp}
					updateSelect={this.updateSelect}
					clickEvent={this.editTodo}
				/>
			);
		}
	}
);
