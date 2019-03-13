import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import Button from '../button';

import './search-block.scss';

export class SearchBlock extends Component {
	static propTypes = {
		name: PropTypes.string,
		placeholderName: PropTypes.string,
		changeEvent: PropTypes.func,
	};

	constructor() {
		super();
		this.state = {
			value: '',
		};
	}

	changeEvent = value => {
		this.setState({
			value: value,
		});
		this.changeEventDebounce(value);
	};

	changeEventDebounce = debounce(value => {
		this.props.changeEvent(value, this.props.name);
	}, 250);

	clearInput = () => {
		this.setState({
			value: '',
		});
		this.props.changeEvent('', this.props.name);
	};

	render() {
		return (
			<div className="search-block">
				<input
					value={this.state.value}
					onChange={event => this.changeEvent(event.target.value)}
					className="search-block__input"
					type="text"
					placeholder={this.props.placeholderName}
				/>
				{this.state.value && (
					<div
						className="search-block__button"
						onClick={this.clearInput}>
						<Button preset="close" />
					</div>
				)}
			</div>
		);
	}
}
