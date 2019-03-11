import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View } from './todos-view';

import Category from '../../models/category';
import Todo from '../../models/todo';

import ModalComplexEdit from '../../components/modal/edit-todo-modal';
import ModalSimpleEdit from '../../components/modal/category-profile-modal';

import {
	changeInputAction,
	filterTodoItemsAction,
	selectCategoryAction,
	getCategoriesAsyncAction,
	addCategoryAsyncAction,
	addTodoItemAsyncAction,
	getTodoItemsAsyncAction,
	changeLoading
} from '../../store/todos/actions';

import {
	changeModalVisibleAction,
	changeModalFocusAction,
} from '../../store/modal/actions';

const mapStateToProps = state => {
	return {
		todos: state.todos,
	};
};

const mapDispatchToProps = {
	changeInputAction,
	filterTodoItemsAction,
	changeModalVisibleAction,
	changeModalFocusAction,
	selectCategoryAction,
	addCategoryAsyncAction,
	addTodoItemAsyncAction,
	getCategoriesAsyncAction,
	getTodoItemsAsyncAction,
	changeLoading,
};

export const Todos = connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class extends Component {
		inputChanger = (value, name) => {
			this.props.changeInputAction({ value, name });
			if (this.props.todos.selected_category) {
				this.props.filterTodoItemsAction();
			}
		};

		addCategory = value => {
			const new_category = new Category(value);
			this.props.addCategoryAsyncAction(new_category);
		};

		showTodoItems = category => {
			this.props.history.push(`/category/${category.id}`);

			this.props.selectCategoryAction(category);
			this.props.filterTodoItemsAction();
		};

		addTodo = value => {
			const { todos } = this.props;
			if (!todos.selected_category) return;

			const new_todo_item = new Todo(value, todos.selected_category.id);
			this.props.addTodoItemAsyncAction(new_todo_item);
		};

		modalOpen = (preset, item, event) => {
			this.props.changeModalVisibleAction(false);

			switch (preset) {
				case 'add': {
					this.props.changeModalFocusAction(<ModalSimpleEdit status={preset} parent_category={item}/>);
					break;
				}
				case 'edit': {
					this.props.changeModalFocusAction(<ModalSimpleEdit status={preset} category={item} />);
					break;
				}
				case 'edit-todo': {
					this.props.changeModalFocusAction(<ModalComplexEdit status={preset} todo_item={item} />);
					break;
				}
				default: {
					return false;
				}
			}
			event.stopPropagation();
		};

		componentWillMount() {
			this.props.getCategoriesAsyncAction().then(() => {
				this.props.getTodoItemsAsyncAction().then(() => {
					if (this.props.match.params.category_id) {
						const category = this.props.todos.categories.find(
							category => category.id === parseInt(this.props.match.params.category_id)
						);
						if (!category && this.props.match.params.category_id) {
							this.props.history.push(`/404`);
						}
						if (category) {
							this.props.selectCategoryAction(category);
							this.props.filterTodoItemsAction();
						}
					}
					this.props.changeLoading(false);
				});

			});
		}

		render() {
			if (this.props.todos.loading) {
				return (
					<div className="c">
						<div className="loading ptb-20">Loading ...</div>
					</div>
				);
			}
			if (!this.props.todos.loading) {
				return (
					<View
						show_value={this.props.todos.show_value}
						inputChanger={this.inputChanger}
						addCategory={this.addCategory}
						showTodoItems={this.showTodoItems}
						addTodo={this.addTodo}
						modalOpen={this.modalOpen}
					/>
				);
			}
		}
	}
);
