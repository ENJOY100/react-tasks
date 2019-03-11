import * as types from '../types';
import { getFilteredTodoItems } from '../../utils/get-filtered-todo-items';

const todosState = {
	categories: [],
	todo_items: [],
	selected_category: null,
	filtered_todos: [],
	search_value: '',
	show_value: false,
	loading: true,
};

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
					if (category.id === parseInt(action.payload.category.id)) {
						category.name = action.payload.value;
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
					if (
						todo_item.id === parseInt(action.payload.todo_item.id)
					) {
						todo_item.name = action.payload.value
							? action.payload.value
							: action.payload.todo_item.name;
						todo_item.checked =
							typeof action.payload.checked == 'boolean'
								? action.payload.checked
								: action.payload.todo_item.checked;
						todo_item.category_id = action.payload.selected_id
							? action.payload.selected_id
							: action.payload.todo_item.category_id;
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
		case types.FILTER_TODO_ITEMS: {
			return {
				...state,
				filtered_todos: getFilteredTodoItems(state),
			};
		}
		case types.CLEAR_FILTERED_TODOS_ITEMS: {
			return {
				...state,
				filtered_todos: [],
			};
		}
		case types.SELECT_CATEGORY: {
			return {
				...state,
				selected_category: action.payload,
			};
		}
		case types.CLOSE_MODAL: {
			return {
				...state,
				focus: null,
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
