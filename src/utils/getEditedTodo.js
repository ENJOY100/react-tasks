export const getEditedTodo = (todos, input) => {
    const id = todos.fetch.indexOf(todos.view);

    if (!input.modalNameValue) return alert('Enter the Todo title');

    const todoID = todos.fetch[id].items.indexOf(todos.focus);
    const todoEL = todos.focus;

    todoEL.name = input.modalNameValue;
    todoEL.checked = input.modalCheckValue;

    if (todos.selected) {
        const selectedID = todos.fetch.indexOf(todos.selected);
        todos.fetch[selectedID].items.push(todoEL);
        todos.fetch[id].items.splice(todoID, 1);

        return todos;
    } else {
        todos.fetch[id].items[todoID] = todoEL;

        return todos;
    }
}