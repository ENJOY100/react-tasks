export const getFilteredTodoItems = todos => {
	if (!todos.selected_category) {
		return;
	}

	let category = todos.selected_category,
		todo_items = todos.todo_items.filter(
			todo_item => parseInt(todo_item.category_id) === parseInt(category.id)
		);

	if (category && todo_items) {
		if (todos.show_value) {
			todo_items = todo_items.filter(todo_item => todo_item.checked);
		}
	}

	if (todos.search_value && category && todo_items) {
		todo_items = todo_items.filter(todo_item =>
			todo_item.name.includes(todos.search_value)
		);
	}

	if (todos.search_value && todos.show_value && category && todo_items) {
		todo_items = todo_items.filter(todo_item =>
			todo_item.checked && todo_item.name.includes(todos.search_value)
		);
	}

	todo_items = todo_items.length > 0 ? todo_items : null;
	return todo_items;
};
