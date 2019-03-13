import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../../../components/button';
import CategoriesTreeItem from './categories-tree-item';

export const View = props => {
	const {
		category,
		modalOpen,
		deleteCategory,
		openList,
		categories,
		showTodoItems,
		selectEvent,
		opened,
	} = props;

	let treeClickEvent = showTodoItems ? showTodoItems : selectEvent,
		children_categories = categories.filter(
			child_category => child_category.parent_id === category.id
		);

	const category_opened = !!(opened && children_categories.length),
		category_class = classNames(
			'tree-list__item',
			{ opened: category_opened },
			{ 'tree-list__select-item': !showTodoItems }
		);

	return (
		<li className={category_class}>
			<div className="tree-list__body" onClick={() => {treeClickEvent(category)}}>
				<div className="r ai-c cp-0">
					<div className="col-5 t-c">
						{ children_categories.length > 0 && openList && (
							<div
								className="tree-list__button"
								onClick={openList}>
								<Button preset="open" />
							</div>
						)}
					</div>
					<div className="col-50">
						<div className="tree-list__name">{category.name}</div>
						{ modalOpen && (
							<div className="tree-list__button" onClick={event => modalOpen('edit', category, event)}>
								<Button preset="edit" />
							</div>
						)}
					</div>
					<div className="col-45 t-r">
						{ deleteCategory && (
							<div className="tree-list__button" onClick={event => deleteCategory(category, event)}>
								<Button preset="delete" />
							</div>
						)}
						{ modalOpen && (
							<div className="tree-list__button" onClick={event => modalOpen('add', category, event)}>
								<Button preset="add" />
							</div>
						)}
					</div>
				</div>
			</div>

			{ children_categories.length > 0 && (
				<ul className="tree-list">
					{ children_categories.map(child_category => (
						<CategoriesTreeItem
							key={child_category.id}
							category={child_category}
							showTodoItems={showTodoItems}
							modalOpen={modalOpen}
							selectEvent={selectEvent}
						/>
					)) }
				</ul>
			)}
		</li>
	);
};

View.propTypes = {
	category: PropTypes.shape({
		name: PropTypes.string,
	}),
	deleteCategory: PropTypes.func,
	modalOpen: PropTypes.func,
	openList: PropTypes.func,
	categories: PropTypes.array,
	showTodoItems: PropTypes.func,
	selectEvent: PropTypes.func,
	opened: PropTypes.bool
};
