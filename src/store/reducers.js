import { combineReducers } from 'redux';

import todosReducer from './todos';
import inputReducer from './input';
import modalReducer from './modal';

export const mainReducer = combineReducers({
    todos: todosReducer,
    input: inputReducer,
    modal: modalReducer
});
