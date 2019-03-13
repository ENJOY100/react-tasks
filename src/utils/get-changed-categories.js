export const getChangedCategories = (
	categories,
	clicked_category_id,
	todo_items
) => {
	if (!categories.length && !clicked_category_id) return;

	const remaining_categories = categories.filter(category => {
			if (category.parents.length > 0) {
				let i = 0,
					dirty = false;
				for (; i < category.parents.length; i++) {
					if (category.parents[i] === +clicked_category_id) {
						dirty = true;
					}
				}
				if (!dirty && +category.id !== +clicked_category_id) {
					return category;
				}
			} else {
				return (
					+category.parent_id !== +clicked_category_id &&
					+category.id !== +clicked_category_id
				);
			}
			return false;
		}),
		deleted_categories = categories.filter(category => {
			if (category.parents.length > 0) {
				let i = 0,
					dirty = false;
				for (; i < category.parents.length; i++) {
					if (category.parents[i] === +clicked_category_id) {
						dirty = true;
					}
				}
				if (dirty || +category.id === +clicked_category_id) {
					return category;
				}
			} else {
				return (
					+category.parent_id === +clicked_category_id ||
					+category.id === +clicked_category_id
				);
			}
			return false;
		}),
		deleted_todo_items = todo_items.filter(todo_item => {
			for (let i = 0; i < deleted_categories.length; i++) {
				if (+todo_item.category_id === +deleted_categories[i].id) {
					return todo_item;
				}
			}
			return false;
		}),
		remaining_todo_items = todo_items.filter(todo_item => {
			for (let i = 0; i < remaining_categories.length; i++) {
				if (+todo_item.category_id === +remaining_categories[i].id) {
					return todo_item;
				}
			}
			return false;
		});

	return {
		remaining_categories,
		deleted_categories,
		deleted_todo_items,
		remaining_todo_items,
	};
};
