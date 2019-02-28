import * as types  from '../types';

const modalState = {
    hidden: true,
    focus: null
}

export const modalReducer = (state = modalState, action) => {
    switch (action.type) {
        case types.CHANGE_MODAL_VISIBLE: {
            return {
                ...state,
                hidden: action.value
            }
        }
        case types.CHANGE_MODAL_FOCUS: {
            return {
                ...state,
                focus: action.value
            }
        }
        case types.MODAL_CLOSE: {
            return {
                ...state,
                hidden: true,
                focus: null
            }
        }
        default: {
            return state;
        }
    }
}