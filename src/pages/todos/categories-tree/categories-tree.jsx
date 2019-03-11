import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoriesTreeItem from './categories-tree-item';

import './tree.scss';

const mapStateToProps = state => {
	return {
		categories: state.todos.categories,
	};
};

export const CategoriesTree = connect(mapStateToProps)(
	class extends Component {
		static propTypes = {
			todos: PropTypes.shape({
				categories: PropTypes.array,
			}),
			showTodoItems: PropTypes.func,
			modalOpen: PropTypes.func,
			selectEvent: PropTypes.func,
		};

		render() {
			let {
				categories = [],
				showTodoItems,
				modalOpen,
				selectEvent,
			} = this.props;

			categories = categories.filter(
				category => category.parent_id == null
			);

			return (
				<div className="tree">
					<ul className="tree-list">
						{ categories.map(category => (
							<CategoriesTreeItem
								key={category.id}
								category={category}
								showTodoItems={showTodoItems}
								modalOpen={modalOpen}
								selectEvent={selectEvent}
							/>
						))}
					</ul>
				</div>
			);
		}
	}
);
