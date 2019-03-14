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
			setTimeout(() => {
				axios
					.get('/categories')
					.then(response => {
						dispatch(updateCategoriesAction(response.data));
						resolve();
					})
					.catch(error => {
						dispatch(drawError(error.message));
						reject();
					});
			}, 500);
		});
	};
};

export const getTodoItemsAsyncAction = () => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios
					.get('/todoitems')
					.then(response => {
						dispatch(updateTodoItemsAction(response.data));
						resolve();
					})
					.catch(error => {
						dispatch(drawError(error.message));
						reject();
					});
			}, 200);
		});
	};
};

export const addCategoryAsyncAction = category => {
	return dispatch => {
		axios
			.post('/categories', category)
			.then(() => {
				dispatch(addCategoryAction(category));
			})
			.then(() => {
				if (category.parent_id) {
					dispatch(closeModalAction());
				}
			})
			.catch(error => {
				dispatch(drawError(error.message));
			});
	};
};

export const addTodoItemAsyncAction = todo_item => {
	return dispatch => {
		axios
			.post('/todoitems', todo_item)
			.then(() => {
				dispatch(addTodoItemAction(todo_item));
			})
			.catch(error => {
				dispatch(drawError(error.message));
			});
	};
};

export const changeCategoryAsyncAction = category => {
	return dispatch => {
		axios
			.put(`/categories/${category.id}`, category)
			.then(() => {
				dispatch(changeCategoryAction(category));
			})
			.then(() => {
				dispatch(closeModalAction());
			})
			.catch(error => {
				dispatch(drawError(error.message));
			});
	};
};

export const changeTodoItemAsyncAction = (todo_item, in_modal) => {
	return dispatch => {
		axios
			.put(`/todoitems/${todo_item.id}`, todo_item)
			.then(() => {
				dispatch(changeTodoItemAction(todo_item));
			})
			.then(() => {
				if (in_modal) {
					dispatch(closeModalAction());
				}
			})
			.catch(error => {
				dispatch(drawError(error.message));
			});
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
			} catch (error) {
				dispatch(drawError(error.message));
				return;
			}
		}
		for await (let value of changed_categories.deleted_categories) {
			try {
				await axios.delete(`/categories/${value.id}`, value);
			} catch (error) {
				dispatch(drawError(error.message));
				return;
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

export const drawError = payload => ({
	type: types.DRAW_ERROR,
	payload,
});
