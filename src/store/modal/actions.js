import * as types from '../types';

export const changeModalVisibleAction = value => ({
	type: types.CHANGE_MODAL_VISIBLE,
	payload: value,
});

export const changeModalFocusAction = value => ({
	type: types.CHANGE_MODAL_FOCUS,
	payload: value,
});

export const closeModalAction = () => ({
	type: types.CLOSE_MODAL,
});
