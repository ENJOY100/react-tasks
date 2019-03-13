import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './category-profile-modal-view';

import Category from '../../../models/category';

import {
	changeCategoryAsyncAction,
	addCategoryAsyncAction,
} from '../../../store/todos/actions';

const mapDispatchToProps = {
	changeCategoryAsyncAction,
	addCategoryAsyncAction,
};

export const CategoryProfileModal = connect(
	null,
	mapDispatchToProps
)(
	class extends Component {
		static propTypes = {
			parent_category: PropTypes.object,
			category: PropTypes.shape({
				name: PropTypes.string,
			}),
			changeCategoryAsyncAction: PropTypes.func,
			addCategoryAsyncAction: PropTypes.func,
		};

		constructor(props) {
			super(props);
			this.state = {
				name: props.category ? props.category.name : '',
			};
		}

		inputChangeEvent = event => {
			this.setState({
				name: event.target.value,
			});
		};

		handleKeyUp = event => {
			if (event.key === 'Enter') {
				this.clickEvent();
			}
		};

		addSubCategory = name => {
			if (!name) return;
			const new_category = new Category(name, this.props.parent_category);
			this.props.addCategoryAsyncAction(new_category);
		};

		editCategory = name => {
			if (!name) return;
			const category = {
				...this.props.category,
				name,
			};
			this.props.changeCategoryAsyncAction(category);
		};

		clickEvent = () => {
			if (this.props.category) {
				this.editCategory(this.state.name);
			} else {
				this.addSubCategory(this.state.name);
			}
		};

		render() {
			const title = this.props.category
				? 'Edit Category'
				: 'Add Category';
			return (
				<View
					title={title}
					value={this.state.name}
					inputChangeEvent={this.inputChangeEvent}
					handleKeyUp={this.handleKeyUp}
					clickEvent={this.clickEvent}
				/>
			);
		}
	}
);
