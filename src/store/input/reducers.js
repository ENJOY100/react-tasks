import * as types from '../types';

const inputState = {
    searchValue: '',
    modalNameValue: '',
    modalCheckValue: false,
    showValue: false
}

export const inputReducer = (state = inputState, action) => {
    switch (action.type) {
        case types.INPUT_CHANGE: {
            return {
                ...state,
                [action.name]: action.value
            }
        }
        case types.CHANGE_MODAL_NAME_VALUE: {
            return {
                ...state,
                modalNameValue: action.value
            }
        }
        case types.CHANGE_MODAL_CHECK_VALUE: {
            return {
                ...state,
                modalCheckValue: action.value
            }
        }
        case types.MODAL_CLOSE: {
            return {
                ...state,
                modalСheckValue: false,
                modalNameValue: ''
            }
        }
        default: {
            return state;
        }
    }
};