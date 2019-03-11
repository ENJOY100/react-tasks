import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const View = ({ el, modal, modalClose, clickOver }) => {
	return (
		<div className={classNames('modal-wrap', { hidden: modal.is_hidden })} onClick={clickOver}>
			<div className="modal" ref={el}>
				<div className="modal__close" onClick={modalClose}>×</div>

				{modal.focus}

			</div>
		</div>
	);
};

View.propTypes = {
	el: PropTypes.object,
	modal: PropTypes.shape({
		is_hidden: PropTypes.bool,
		focus: PropTypes.object,
	}),
	modalClose: PropTypes.func,
	clickOver: PropTypes.func,
};
