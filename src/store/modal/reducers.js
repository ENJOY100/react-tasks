import * as types from '../types';

const modalState = {
	is_hidden: true,
	focus: null,
};

export const modalReducer = (state = modalState, action) => {
	switch (action.type) {
		case types.CHANGE_MODAL_VISIBLE: {
			return {
				...state,
				is_hidden: action.payload,
			};
		}
		case types.CHANGE_MODAL_FOCUS: {
			return {
				...state,
				focus: action.payload,
			};
		}
		case types.CLOSE_MODAL: {
			return {
				...state,
				is_hidden: true,
				focus: null,
			};
		}
		default: {
			return state;
		}
	}
};
