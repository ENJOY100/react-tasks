import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from './modal-view';

import { closeModalAction } from '../../store/modal/actions';

import './modal.scss';

const mapStateToProps = state => {
	return {
		modal: state.modal,
	};
};

const mapDispatchToProps = {
	closeModalAction,
};

export const Modal = connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class extends Component {
		static propTypes = {
			modal: PropTypes.shape({
				is_hidden: PropTypes.bool,
			}),
			closeModalAction: PropTypes.func,
		};

		constructor() {
			super();
			this.el = React.createRef();
		}

		clickOver = event => {
			const { modal, closeModalAction } = this.props;
			if (!this.el.current.contains(event.target) && !modal.is_hidden) {
				closeModalAction();
			}
		};

		render() {
			const { modal, closeModalAction } = this.props;
			return (
				<View
					el={this.el}
					clickOver={this.clickOver}
					modal={modal}
					modalClose={closeModalAction}
				/>
			);
		}
	}
);
