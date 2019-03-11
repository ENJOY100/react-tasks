import { combineReducers } from "redux";

import todosReducer from "./todos";
import modalReducer from "./modal";

export const mainReducer = combineReducers({
	todos: todosReducer,
	modal: modalReducer
});
