export default class Todo {
	constructor(name, category_id) {
		this.id = Math.floor(Math.random() * (10 ** 10 - 10 + 1) + 10);
		this.name = name;
		this.checked = false;
		this.category_id = category_id;
	}
}
