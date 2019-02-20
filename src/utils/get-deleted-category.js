export const getDeletedCategory = (todos, el) => {
    const id = todos.fetch.indexOf(el);

    todos.fetch.splice(id, 1);
    if (todos.list === el) todos.list = todos.listItems = null;
    return todos;
}