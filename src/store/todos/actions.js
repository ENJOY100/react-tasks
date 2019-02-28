import * as types from '../types';

export const getTodos = () => {
    return (dispatch) => {
        /*setTimeout(() => {*/
            fetch('http://localhost:3001/fetch')
                .then(res => res.json())
                .then(
                    data => dispatch(todosFetchFromServer(data))
                );
        /*}, 2000)*/
    }
};

export const changeLoading = (value) => ({
    type: types.CHANGE_LOADING,
    value
});

export const todosFetchFromServer = (fetch) => ({
    type: types.TODOS_FETCH_FROM_SERVER,
    fetch
});

export const todosFilterAction = (fetch) => ({
    type: types.TODOS_FILTER,
    fetch
});

export const changeTodosFocusAction = (item) => ({
    type: types.CHANGE_TODOS_FOCUS,
    item
});

export const selectCategoryAction = (item) => ({
    type: types.SELECT_CATEGORY,
    item
});

export const todosTreeClear = () => ({
    type: types.TODOS_TREE_CLEAR
});

export const updateTodosAllAction = (todos) => ({
    type: types.UPDATE_TODOS_ALL,
    todos
});

export const updateTodosFetchAction = (fetch) => ({
    type: types.UPDATE_TODOS_FETCH,
    fetch
});