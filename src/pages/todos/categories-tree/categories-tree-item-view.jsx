import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';

export const View = props => {
	const {
		category,
		modalOpen,
		deleteCategory,
		openList,
		category_class,
		children_categories,
		treeClickEvent,
	} = props;

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
				<ul className="tree-list">{ children_categories }</ul>
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
	category_class: PropTypes.string,
	children_categories: PropTypes.array,
	treeClickEvent: PropTypes.func
};
