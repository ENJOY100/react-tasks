import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const View = ({ el, modal, modalClose, clickOver }) => {
	return (
		<div
			className={classNames('modal-wrap', { hidden: modal.is_hidden })}
			onClick={clickOver}>
			<div className="modal" ref={el}>
				<div className="modal__close" onClick={modalClose}>
					×
				</div>

				{modal.modal_component}
			</div>
		</div>
	);
};

View.propTypes = {
	el: PropTypes.object,
	modal: PropTypes.shape({
		is_hidden: PropTypes.bool,
		modal_component: PropTypes.object,
	}),
	modalClose: PropTypes.func,
	clickOver: PropTypes.func,
};
