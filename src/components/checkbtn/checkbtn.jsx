import React from 'react';
import PropTypes from 'prop-types';

import './checkbtn.scss';

export const CheckButton = ({ text, value, changeEvent }) => {
	return (
		<div className="check-button">
			<label className="check-button__label">
				<input
					checked={value}
					className="check-button__checkbox"
					type="checkbox"
					onChange={changeEvent}
				/>
				{text && <div className="check-button__text">{text}</div>}
			</label>
		</div>
	);
};

CheckButton.propTypes = {
	text: PropTypes.string,
	value: PropTypes.bool,
	changeEvent: PropTypes.func,
};
