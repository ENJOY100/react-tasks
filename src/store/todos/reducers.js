import * as types from '../types';
import { createSelector } from 'reselect';
import { getFilteredTodoItems } from '../../utils/get-filtered-todo-items';

const todosState = {
	categories: [],
	todo_items: [],
	search_value: '',
	show_value: false,
	loading: true,
};

const getTodosState = state => state.todos;
const getProps = (state, props) => props.selected_category_id;
export const getFilteredTodoItemsSelector = createSelector(
	[getTodosState, getProps],
	(state, props) => {
		return getFilteredTodoItems(state, props);
	}
);

export const todosReducer = (state = todosState, action) => {
	switch (action.type) {
		case types.UPDATE_CATEGORIES: {
			return {
				...state,
				categories: action.payload,
			};
		}
		case types.ADD_CATEGORY: {
			return {
				...state,
				categories: [...state.categories, action.payload],
			};
		}
		case types.CHANGE_CATEGORY: {
			return {
				...state,
				categories: state.categories.map(category => {
					if (+category.id === +action.payload.id) {
						category = action.payload;
					}
					return category;
				}),
			};
		}
		case types.ADD_TODO_ITEM: {
			return {
				...state,
				todo_items: [...state.todo_items, action.payload],
			};
		}
		case types.CHANGE_TODO_ITEM: {
			return {
				...state,
				todo_items: state.todo_items.map(todo_item => {
					if (todo_item.id === +action.payload.id) {
						return action.payload;
					}
					return todo_item;
				}),
			};
		}
		case types.UPDATE_TODO_ITEMS: {
			return {
				...state,
				todo_items: action.payload,
			};
		}
		case types.CLOSE_MODAL: {
			return {
				...state,
				modal_component: null,
			};
		}
		case types.CHANGE_LOADING: {
			return {
				...state,
				loading: action.payload,
			};
		}
		case types.CHANGE_INPUT: {
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		}
		default: {
			return state;
		}
	}
};
