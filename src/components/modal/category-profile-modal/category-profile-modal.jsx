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
			status: PropTypes.string,
			parent_category: PropTypes.object,
			category: PropTypes.shape({
				name: PropTypes.string,
			}),
			changeCategoryAsyncAction: PropTypes.func,
			addCategoryAsyncAction: PropTypes.func,
		};

		constructor() {
			super();
			this.state = {
				value: '',
			};
		}

		inputChangeEvent = event => {
			this.setState({
				value: event.target.value,
			});
		};

		handleKeyUp = event => {
			if (event.key === 'Enter') {
				this.clickEvent();
			}
		};

		addSubCategory = value => {
			if (!value) return;

			const new_category = new Category(
				value,
				this.props.parent_category
			);
			this.props.addCategoryAsyncAction(new_category);
		};

		editCategory = value => {
			if (!value) return;
			const payload = {
				category: this.props.category,
				value,
			};
			this.props.changeCategoryAsyncAction(payload);
		};

		clickEvent = () => {
			switch (this.props.status) {
				case 'add': {
					return this.addSubCategory(this.state.value);
				}
				case 'edit': {
					return this.editCategory(this.state.value);
				}
				default: {
					return false;
				}
			}
		};

		componentWillMount() {
			this.setState({
				value: this.props.category ? this.props.category.name : '',
			});
		}

		render() {
			return (
				<View
					status={this.props.status}
					value={this.state.value}
					inputChangeEvent={this.inputChangeEvent}
					handleKeyUp={this.handleKeyUp}
					clickEvent={this.clickEvent}
				/>
			);
		}
	}
);
