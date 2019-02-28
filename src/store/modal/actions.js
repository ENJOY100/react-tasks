import * as types from '../types';

export const changeModalVisibleAction = (value) => ({
    type: types.CHANGE_MODAL_VISIBLE,
    value: value
});

export const changeModalFocusAction = value => ({
    type: types.CHANGE_MODAL_FOCUS,
    value: value
});

export const modalCloseAction = () => ({
    type: types.MODAL_CLOSE
});