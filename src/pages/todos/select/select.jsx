import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import CategoriesTree from '../categories-tree';

import './select.scss';

export class Select extends Component {
	static propTypes = {
		updateSelect: PropTypes.func,
	};

	constructor() {
		super();
		this.state = {
			opened: false,
			selected: null,
		};
	}

	selectOpen = () => {
		this.setState(prevState => ({
			opened: !prevState.opened,
		}));
	};

	selectEvent = value => {
		this.setState({
			selected: value,
		});
		this.props.updateSelect(value);
	};

	render() {
		const selected_name = this.state.selected
			? this.state.selected.name
			: 'Move to category';
		return (
			<div
				className={classNames('select', { opened: this.state.opened })}
				onClick={this.selectOpen}>
				<div className="select__title">{selected_name}</div>
				<div className="select__body">
					<CategoriesTree selectEvent={this.selectEvent} />
				</div>
			</div>
		);
	}
}
