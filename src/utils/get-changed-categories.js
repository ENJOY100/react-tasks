export const getChangedCategories = (categories, clicked_category, todo_items) => {
	if (!categories.length && !clicked_category) return;

	const remaining_categories = categories.filter(category => {
			if (category.parents.length > 0) {
				let i = 0,
					dirty = false;
				for (; i < category.parents.length; i++) {
					if (category.parents[i] === parseInt(clicked_category.id)) {
						dirty = true;
					}
				}
				if (!dirty && parseInt(category.id) !== parseInt(clicked_category.id)) {
					return category;
				}
			} else {
				return (parseInt(category.parent_id) !== parseInt(clicked_category.id) && parseInt(category.id) !== parseInt(clicked_category.id));
			}
			return false;
		}),
		deleted_categories = categories.filter(category => {
			if (category.parents.length > 0) {
				let i = 0,
					dirty = false;
				for (; i < category.parents.length; i++) {
					if (category.parents[i] === parseInt(clicked_category.id)) {
						dirty = true;
					}
				}
				if (dirty || parseInt(category.id) === parseInt(clicked_category.id)) {
					return category;
				}
			} else {
				return (parseInt(category.parent_id) === parseInt(clicked_category.id) || parseInt(category.id) === parseInt(clicked_category.id));
			}
			return false;
		}),
		deleted_todo_items = todo_items.filter(todo_item => {
			for (let i = 0; i < deleted_categories.length; i++) {
				if (parseInt(todo_item.category_id) === parseInt(deleted_categories[i].id)) {
					return todo_item;
				}
			}
			return false;
		}),
		remaining_todo_items = todo_items.filter(todo_item => {
			for (let i = 0; i < deleted_categories.length; i++) {
				if (parseInt(todo_item.category_id) !== parseInt(deleted_categories[i].id)) {
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
