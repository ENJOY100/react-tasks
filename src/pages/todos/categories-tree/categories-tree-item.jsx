import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './categories-tree-item-view';

import { getChangedCategories } from '../../../utils/get-changed-categories';

import {
	deleteCategoriesAsyncAction,
	clearFilteredTodoItemsAction,
	selectCategoryAction,
} from '../../../store/todos/actions';

import './tree.scss';

const mapStateToProps = state => {
	return {
		categories: state.todos.categories,
		todo_items: state.todos.todo_items,
		selected_category: state.todos.selected_category,
	};
};

const mapDispatchToProps = {
	deleteCategoriesAsyncAction,
	clearFilteredTodoItemsAction,
	selectCategoryAction,
};

const CategoriesTreeItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class extends Component {
		static propTypes = {
			category: PropTypes.shape({
				id: PropTypes.number,
			}),
			categories: PropTypes.array,
			todo_items: PropTypes.array,
			selected_category: PropTypes.object,
			showTodoItems: PropTypes.func,
			modalOpen: PropTypes.func,
			selectEvent: PropTypes.func,
		};

		constructor() {
			super();
			this.state = {
				opened: false,
			};
		}

		openList = event => {
			this.setState({
				opened: !this.state.opened,
			});
			event.stopPropagation();
		};

		deleteCategory = (category, event) => {
			const { categories, todo_items, selected_category } = this.props,
				changed_categories = getChangedCategories(categories, category, todo_items);

			if (selected_category && parseInt(selected_category.id) === parseInt(category.id)) {
				this.props.selectCategoryAction(null);
			}

			changed_categories.deleted_todo_items.forEach(todo_item => {
				if (parseInt(todo_item.category_id) === parseInt(selected_category.id)) {
					this.props.selectCategoryAction(null);
				}
			});

			this.props.deleteCategoriesAsyncAction(changed_categories);
			event.stopPropagation();
		};

		render() {
			const {
				category,
				categories = [],
				showTodoItems,
				modalOpen,
				selectEvent,
			} = this.props;

			let treeClickEvent = showTodoItems ? showTodoItems : selectEvent,
				children_categories = categories.filter(
					child_category => child_category.parent_id === category.id
				);

			const category_opened = this.state.opened && children_categories.length > 0 ? true : false,
				category_class = classNames(
					'tree-list__item',
					{ opened: category_opened },
					{ 'tree-list__select-item': !showTodoItems }
				);

			children_categories = children_categories.map(child_category => (
				<CategoriesTreeItem
					key={child_category.id}
					category={child_category}
					showTodoItems={showTodoItems}
					modalOpen={modalOpen}
					selectEvent={selectEvent}
				/>
			));

			return (
				<View
					key={category.id}
					category={category}
					modalOpen={modalOpen}
					deleteCategory={this.deleteCategory}
					openList={this.openList}
					category_class={category_class}
					children_categories={children_categories}
					treeClickEvent={treeClickEvent}
				/>
			);
		}
	}
);

export default CategoriesTreeItem;
