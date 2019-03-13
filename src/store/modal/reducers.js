import * as types from '../types';

const modalState = {
	is_hidden: true,
	modal_component: null,
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
				modal_component: action.payload,
			};
		}
		case types.CLOSE_MODAL: {
			return {
				...state,
				is_hidden: true,
				modal_component: null,
			};
		}
		default: {
			return state;
		}
	}
};
