import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './todo-item-view';

import { changeTodoItemAsyncAction } from '../../../store/todos/actions';

import './todo-item.scss';

const mapStateToProps = state => {
	return {
		todos: state.todos,
	};
};

const mapDispatchToProps = {
	changeTodoItemAsyncAction,
};

const TodoItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class TodoItem extends Component {
		static propTypes = {
			todo_item: PropTypes.shape({
				checked: PropTypes.bool,
			}),
			modalOpen: PropTypes.func,
		};

		constructor() {
			super();
			this.state = {
				checked: false,
			};
		}

		changeEvent = (value, todo_item) => {
			this.setState({
				checked: value,
			});
			this.singleTodoCheck(value, todo_item);
		};

		singleTodoCheck = (value, todo_item) => {
			const payload = {
				todo_item,
				checked: value,
			};
			this.props.changeTodoItemAsyncAction(payload);
		};

		static getDerivedStateFromProps(nextProps, prevState) {
			if (nextProps.todo_item.checked !== prevState.checked) {
				return {
					checked: nextProps.todo_item.checked,
				};
			}
			return false;
		}

		render() {
			return (
				<View
					key={this.props.todo_item.id}
					todo_item={this.props.todo_item}
					value={this.state.checked}
					modalOpen={this.props.modalOpen}
					changeEvent={this.changeEvent}
				/>
			);
		}
	}
);

export default TodoItem;
