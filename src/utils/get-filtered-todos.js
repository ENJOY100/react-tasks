export const getFilteredTodos = (todos, input, slug) => {
    const historyCategory = todos.fetch.find(category => category.id === parseFloat(slug));

    if (!historyCategory) {
        return
    }

    let todosFetch, todosList;

    todosList = historyCategory;

    if (todosList && todosList.items) {
        if (input.showValue) {
            todosFetch = todosList.items.filter(todo =>
                todo.checked
            );
        } else {
            todosFetch = todosList.items;
        }
    }

    if (input.searchValue && todosList && todosList.items) {
        todosFetch = todosList.items.filter(todo =>
            todo.name.includes(input.searchValue)
        );
    }

    if (input.searchValue && input.showValue && todosList && todosList.items) {
        todosFetch = todosList.items.filter(todo =>
            todo.checked
        );
        todosFetch = todosFetch.filter(todo =>
            todo.name.includes(input.searchValue)
        );
    }

    todosList = todosFetch.length > 0 ? todosFetch : null;

    return todosList;
}