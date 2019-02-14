export const getDeletedCategory = (todos, el) => {
    const id = todos.fetch.indexOf(el);
    todos.fetch.splice(id, 1);

    if (todos.view === el) todos.view = null;
    return todos;
}