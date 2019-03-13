import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './categories-tree-item-view';

import { deleteCategoriesAsyncAction } from '../../../store/todos/actions';

import './tree.scss';

const mapStateToProps = state => {
	return {
		categories: state.todos.categories,
	};
};

const mapDispatchToProps = {
	deleteCategoriesAsyncAction,
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
			this.props.deleteCategoriesAsyncAction(category.id);
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

			return (
				<View
					key={category.id}
					category={category}
					modalOpen={modalOpen}
					deleteCategory={this.deleteCategory}
					openList={this.openList}
					categories={categories}
					showTodoItems={showTodoItems}
					selectEvent={selectEvent}
					opened={this.state.opened}
				/>
			);
		}
	}
);

export default CategoriesTreeItem;
