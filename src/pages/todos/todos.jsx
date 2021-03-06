import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { View } from './todos-view';

import Category from '../../models/category';
import Todo from '../../models/todo';

import EditTodoModal from '../../components/modal/edit-todo-modal';
import CategoryProfileModal from '../../components/modal/category-profile-modal';

import {
	changeInputAction,
	getCategoriesAsyncAction,
	addCategoryAsyncAction,
	addTodoItemAsyncAction,
	getTodoItemsAsyncAction,
	changeLoading,
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
	changeModalVisibleAction,
	changeModalFocusAction,
	addCategoryAsyncAction,
	addTodoItemAsyncAction,
	getCategoriesAsyncAction,
	getTodoItemsAsyncAction,
	changeLoading,
};

export const Todos = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(
		class extends Component {
			inputChanger = (value, name) => {
				this.props.changeInputAction({ value, name });
			};

			addCategory = value => {
				const new_category = new Category(value);
				this.props.addCategoryAsyncAction(new_category);
			};

			showTodoItems = category => {
				this.props.history.push(`/category/${category.id}`);
			};

			addTodo = value => {
				const { todos, match } = this.props;
				const matched_category = todos.categories.find(
					category => +category.id === +match.params.category_id
				);
				if (!match.params.category_id || !matched_category) return;

				const new_todo_item = new Todo(value, match.params.category_id);
				this.props.addTodoItemAsyncAction(new_todo_item);
			};

			modalOpen = (preset, item, event) => {
				this.props.changeModalVisibleAction(false);

				switch (preset) {
					case 'add': {
						this.props.changeModalFocusAction(
							<CategoryProfileModal parent_category={item} />
						);
						break;
					}
					case 'edit': {
						this.props.changeModalFocusAction(
							<CategoryProfileModal category={item} />
						);
						break;
					}
					case 'edit-todo': {
						this.props.changeModalFocusAction(
							<EditTodoModal todo_item={item} />
						);
						break;
					}
					default: {
						return false;
					}
				}
				event.stopPropagation();
			};

			componentDidMount() {
				this.props.getCategoriesAsyncAction().then(() => {
					this.props.getTodoItemsAsyncAction().then(() => {
						if (this.props.match.params.category_id) {
							const category = this.props.todos.categories.find(
								category =>
									category.id ===
									+this.props.match.params.category_id
							);
							if (
								!category &&
								this.props.match.params.category_id
							) {
								this.props.history.push(`/404`);
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
							selected_category_id={
								this.props.match.params.category_id
							}
						/>
					);
				}
			}
		}
	)
);
