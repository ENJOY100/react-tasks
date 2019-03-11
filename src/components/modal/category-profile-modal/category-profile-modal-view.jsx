import React from 'react';
import PropTypes from 'prop-types';

export const View = props => {
	const { status, value, inputChangeEvent, handleKeyUp, clickEvent } = props;

	return (
		<React.Fragment>
			<div className="modal__head">
				<div className="modal__title">
					{status === 'edit' && 'Edit Category'}
					{status === 'add' && 'Add Category'}
				</div>
			</div>

			<div className="modal__body">
				<div className="modal__line">
					<div className="r ai-c">
						<div className="col-30">
							<label>Name:</label>
						</div>
						<div className="col-70">
							<input
								value={value}
								onChange={inputChangeEvent}
								type="text"
								className="modal__input modal__input--name"
								onKeyUp={handleKeyUp}
							/>
						</div>
					</div>
				</div>

				<div className="modal__line mt-10">
					<button className="btn btn--action" onClick={clickEvent}>
						Save
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

View.propTypes = {
	status: PropTypes.string,
	value: PropTypes.string,
	inputChangeEvent: PropTypes.func,
	handleKeyUp: PropTypes.func,
	clickEvent: PropTypes.func,
};
