import * as types from '../types';

export const getTodos = () => {
    return (dispatch) => {
        setTimeout(() => {
            fetch('http://localhost:3001/fetch')
                .then(res => res.json())
                .then(
                    data => dispatch(updateTodosFetchAction(data))
                )
                .then(() => {
                    dispatch(changeLoading(false))
                })
        }, 500)
    }
}

export const pushTodos = (category) => {
    return () => {
        fetch('http://localhost:3001/fetch', {
                method: 'POST',
                body: JSON.stringify(category),
                headers: {'Content-type': 'application/json'}
            })
            .then(res => console.log(res))
            .catch(res => console.log(res))
    }
};

export const changeTodos = (category) => {
    return () => {
        fetch(`http://localhost:3001/fetch/${category.id}`, {
                method: 'PUT',
                body: JSON.stringify(category),
                headers: {'Content-type': 'application/json'}
            })
            .then(res => console.log(res))
            .catch(res => console.log(res))
    }
};

export const deleteTodos = (category) => {
    return () => {
        fetch(`http://localhost:3001/fetch/${category.id}`, {
            method: 'DELETE',
            body: JSON.stringify(category),
            headers: {'Content-type': 'application/json'}
        })
            .then(res => console.log(res))
            .catch(res => console.log(res))
    }
};

export const changeLoading = (value) => ({
    type: types.CHANGE_LOADING,
    value
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