import axios from 'axios';
import * as types from '../types';
import * as url from '../../constants/url';
import { closeModalAction } from '../modal/actions';
import { getChangedCategories } from '../../utils/get-changed-categories';

axios.defaults.baseURL = url.DATABASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const getCategoriesAsyncAction = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				try {
					const response = await axios.get('/categories');
					dispatch(updateCategoriesAction(response.data));
					resolve();
				} catch (e) {
					reject(e);
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
					const response = await axios.get('/todoitems');
					dispatch(updateTodoItemsAction(response.data));
					resolve();
				} catch (e) {
					reject(e);
				}
			}, 200);
		});
	};
};

export const addCategoryAsyncAction = category => {
	return async dispatch => {
		try {
			await axios.post('/categories', category);
			dispatch(addCategoryAction(category));
			if (category.parent_id) {
				dispatch(closeModalAction());
			}
		} catch (e) {
			throw Error('ADD_CATEGORY', e);
		}
	};
};

export const addTodoItemAsyncAction = category => {
	return async dispatch => {
		try {
			await axios.post('/todoitems', category);
			dispatch(addTodoItemAction(category));
		} catch (e) {
			throw Error('ADD_TODO', e);
		}
	};
};

export const changeCategoryAsyncAction = category => {
	return async dispatch => {
		try {
			await axios.put(`/categories/${category.id}`, category);
			dispatch(changeCategoryAction(category));
			dispatch(closeModalAction());
		} catch (e) {
			throw Error('CHANGE_CATEGORY', e);
		}
	};
};

export const changeTodoItemAsyncAction = (todo_item, in_modal) => {
	return async dispatch => {
		try {
			await axios.put(`/todoitems/${todo_item.id}`, todo_item);
			dispatch(changeTodoItemAction(todo_item));
			if (in_modal) {
				dispatch(closeModalAction());
			}
		} catch (e) {
			throw Error('CHANGE_TODO_ITEM', e);
		}
	};
};

export const deleteCategoriesAsyncAction = category_id => {
	return async (dispatch, getState) => {
		const { categories, todo_items } = getState().todos,
			changed_categories = getChangedCategories(
				categories,
				category_id,
				todo_items
			);

		for await (let value of changed_categories.deleted_todo_items) {
			try {
				await axios.delete(`/todoitems/${value.id}`, value);
			} catch (e) {
				throw Error('DELETE_TODO_ITEM', e);
			}
		}
		for await (let value of changed_categories.deleted_categories) {
			try {
				await axios.delete(`/categories/${value.id}`, value);
			} catch (e) {
				throw Error('DELETE_CATEGORY', e);
			}
		}
		dispatch(
			updateTodoItemsAction(changed_categories.remaining_todo_items)
		);
		dispatch(
			updateCategoriesAction(changed_categories.remaining_categories)
		);
	};
};

export const changeLoading = value => ({
	type: types.CHANGE_LOADING,
	payload: value,
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

export const updateCategoriesAction = categories => ({
	type: types.UPDATE_CATEGORIES,
	payload: categories,
});

export const changeTodoItemAction = payload => ({
	type: types.CHANGE_TODO_ITEM,
	payload,
});
