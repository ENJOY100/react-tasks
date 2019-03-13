export const getFilteredTodoItems = (
	{ todo_items = [], show_value, search_value },
	selected_category_id
) => {
	if (!selected_category_id) {
		return;
	}

	todo_items = todo_items.filter(
		todo_item => +todo_item.category_id === +selected_category_id
	);

	if (show_value) {
		todo_items = todo_items.filter(todo_item => todo_item.checked);
	}

	if (search_value) {
		todo_items = todo_items.filter(todo_item =>
			todo_item.name.includes(search_value)
		);
	}

	return todo_items.length > 0 ? todo_items : null;
};
