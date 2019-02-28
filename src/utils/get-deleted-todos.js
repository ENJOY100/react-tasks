export const getDeletedTodos = (todos, category) => {
    todos.fetch = todos.fetch.filter(item =>
         item.id !== parseFloat(category.id)
    );
    if (todos.selectedCategory === category) todos.selectedCategory = todos.filteredTodos = null;

    return todos;
}