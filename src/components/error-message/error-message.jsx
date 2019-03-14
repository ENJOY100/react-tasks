import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './error-message.scss';

const mapStateToProps = state => {
	return {
		error_message: state.todos.error_message,
	};
};

export const ErrorMessage = connect(mapStateToProps)(({ error_message }) => {
	return (
		<div className={classNames('error-message', { active: error_message })}>
			<div className="c">
				<div className="error-message__heading">Error!</div>
				<div className="error-message__body">{error_message}</div>
			</div>
		</div>
	);
});

ErrorMessage.propTypes = {
	error_message: PropTypes.string,
};
