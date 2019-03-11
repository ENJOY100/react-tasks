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
			status: PropTypes.string,
			todo_item: PropTypes.shape({
				name: PropTypes.string,
				checked: PropTypes.bool,
			}),
			changeTodoItemAsyncAction: PropTypes.func,
		};

		constructor() {
			super();
			this.state = {
				value: '',
				checked: false,
				selected_id: null,
			};
		}

		checkedChangeEvent = event => {
			this.setState({
				checked: event.target.checked,
			});
		};

		inputChangeEvent = event => {
			this.setState({
				value: event.target.value,
			});
		};

		handleKeyUp = event => {
			if (event.key === 'Enter') {
				this.editTodo();
			}
		};

		editTodo = () => {
			const { value, checked, selected_id } = this.state;
			if (!value) return;

			const payload = {
				value,
				checked,
				selected_id,
				todo_item: this.props.todo_item,
			};

			this.props.changeTodoItemAsyncAction(payload);
		};

		updateSelect = value => {
			this.setState({
				selected_id: value.id,
			});
		};

		componentWillMount() {
			this.setState({
				value: this.props.todo_item.name || '',
				checked: this.props.todo_item.checked,
			});
		}

		render() {
			return (
				<View
					value={this.state.value}
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
