//import { storage } from "../../storage";
import * as types  from '../types';

const todosState = {
    fetch: [],
    selectedCategory: null,
    filteredTodos: null,
    focus: null,
    loading: true
}

export const todosReducer = (state = todosState, action) => {
    switch (action.type) {
        case types.UPDATE_TODOS_ALL: {
            //storage.save(action.todos.fetch);
            return {
                ...state,
                fetch: action.todos.fetch,
                selectedCategory: action.todos.selectedCategory,
                filteredTodos: action.todos.filteredTodos,
                focus: action.todos.focus
            }
        }
        case types.UPDATE_TODOS_FETCH: {
            //storage.save(action.fetch);
            return {
                ...state,
                fetch: action.fetch
            }
        }
        case types.TODOS_FILTER: {
            return {
                ...state,
                filteredTodos: action.fetch
            }
        }
        case types.CHANGE_TODOS_FOCUS: {
            return {
                ...state,
                focus: action.item
            }
        }
        case types.SELECT_CATEGORY: {
            return {
                ...state,
                selectedCategory: action.item
            }
        }
        case types.MODAL_CLOSE: {
            return {
                ...state,
                focus: null
            }
        }
        case types.TODOS_TREE_CLEAR: {
            //storage.clear();
            return {
                fetch: [],
                selectedCategory: null,
                filteredTodos: null,
                focus: null
            }
        }
        case types.CHANGE_LOADING: {
            return {
                ...state,
                loading: action.value
            }
        }
        default: {
            return state;
        }
    }
}