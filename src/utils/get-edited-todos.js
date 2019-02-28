export const getEditedTodos = (todos, value, checked, selected) => {
    const id = todos.fetch.indexOf(todos.selectedCategory);
    const todoID = todos.fetch[id].items.indexOf(todos.focus);
    const todoEL = todos.focus;

    todoEL.name = value;
    todoEL.checked = checked;

    if (selected) {
        const selectedID = todos.fetch.indexOf(selected);
        todos.fetch[selectedID].items.push(todoEL);
        todos.fetch[id].items.splice(todoID, 1);

        return todos;
    } else {
        todos.fetch[id].items[todoID] = todoEL;

        return todos;
    }
}