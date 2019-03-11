import * as types from '../types';
import { closeModalAction } from '../modal/actions';
import axios from 'axios';

const axios_tasks = axios.create({
	baseURL: types.DATABASE_URL,
	timeout: 1000,
	headers: { 'Content-type': 'application/json' },
});

export const getCategoriesAsyncAction = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				try {
					const response = await axios_tasks.get('/categories');
					dispatch(updateCategoriesAction(response.data));
					dispatch(changeLoading(false));
					resolve();
				} catch (e) {
					reject();
					//console.log(e);
				}
			}, 500);
		});
	};
};

export const getTodoItemsAsyncAction = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				try {
					const response = await axios_tasks.get('/todoitems');
					dispatch(updateTodoItemsAction(response.data));
					resolve();
				} catch (e) {
					reject();
					//console.log(e);
				}
			}, 200);
		});
	};
};

export const addCategoryAsyncAction = category => {
	return async dispatch => {
		try {
			await axios_tasks.post('/categories', category);
			dispatch(addCategoryAction(category));
			dispatch(closeModalAction());
		} catch (e) {
			//console.log(e)
		}
	};
};

export const addTodoItemAsyncAction = category => {
	return async dispatch => {
		try {
			await axios_tasks.post('/todoitems', category);
			dispatch(addTodoItemAction(category));
			dispatch(filterTodoItemsAction());
		} catch (e) {
			//console.log(e)
		}
	};
};

export const changeCategoryAsyncAction = payload => {
	return async dispatch => {
		try {
			const category = {
				...payload.category,
				name: payload.value,
			};
			await axios_tasks.put(`/categories/${category.id}`, category);
			dispatch(changeCategoryAction(payload));
			dispatch(closeModalAction());
		} catch (e) {
			//console.log(e)
		}
	};
};

export const changeTodoItemAsyncAction = payload => {
	return async dispatch => {
		try {
			const todo_item = {
				...payload.todo_item,
				name: payload.value ? payload.value : payload.todo_item.name,
				checked:
					typeof payload.checked === 'boolean' ? payload.checked : payload.todo_item.checked,
				category_id:
					payload.selected_id ? payload.selected_id : payload.todo_item.category_id,
			};
			await axios_tasks.put(`/todoitems/${todo_item.id}`, todo_item);
			dispatch(changeTodoItemAction(payload));
			dispatch(filterTodoItemsAction());
			dispatch(closeModalAction());
		} catch (e) {
			//console.log(e)
		}
	};
};

export const deleteCategoriesAsyncAction = ({deleted_categories, remaining_categories, deleted_todo_items, remaining_todo_items}) => {
	return async dispatch => {
		for (let i = 0; i < deleted_categories.length; i++) {
			try {
				await axios_tasks.delete(`/categories/${deleted_categories[i].id}`, deleted_categories[i]);
			} catch (e) {
				//console.log(e);
			}
		}
		for (let i = 0; i < deleted_todo_items.length; i++) {
			try {
				await axios_tasks.delete(`/todoitems/${deleted_todo_items[i].id}`, deleted_todo_items[i]);
			} catch (e) {
				//console.log(e);
			}
		}
		dispatch(updateCategoriesAction(remaining_categories));
		dispatch(updateTodoItemsAction(remaining_todo_items));
		dispatch(filterTodoItemsAction());
	};
};

export const changeLoading = value => ({
	type: types.CHANGE_LOADING,
	payload: value,
});

export const filterTodoItemsAction = () => ({
	type: types.FILTER_TODO_ITEMS,
});

export const selectCategoryAction = category => ({
	type: types.SELECT_CATEGORY,
	payload: category,
});

export const addCategoryAction = category => ({
	type: types.ADD_CATEGORY,
	payload: category,
});

export const changeCategoryAction = payload => ({
	type: types.CHANGE_CATEGORY,
	payload,
});

export const addTodoItemAction = category => ({
	type: types.ADD_TODO_ITEM,
	payload: category,
});

export const updateTodoItemsAction = todo_items => ({
	type: types.UPDATE_TODO_ITEMS,
	payload: todo_items,
});

export const changeInputAction = payload => ({
	type: types.CHANGE_INPUT,
	payload,
});

export const clearFilteredTodoItemsAction = () => ({
	type: types.CLEAR_FILTERED_TODOS_ITEMS,
});

export const updateCategoriesAction = categories => ({
	type: types.UPDATE_CATEGORIES,
	payload: categories,
});

export const changeTodoItemAction = payload => ({
	type: types.CHANGE_TODO_ITEM,
	payload,
});
