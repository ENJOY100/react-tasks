import * as types from '../types';

export const inputChangeAction = (value, name) => ({
    type: types.INPUT_CHANGE,
    value: value,
    name: name
});

export const changeModalNameValueAction = value => ({
    type: types.CHANGE_MODAL_NAME_VALUE,
    value: value
});

export const changeModalCheckValueAction = value => ({
    type: types.CHANGE_MODAL_CHECK_VALUE,
    value: value
});