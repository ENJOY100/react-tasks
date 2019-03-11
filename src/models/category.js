export default class Category {
	constructor(name, parent) {
		this.id = Math.floor(Math.random() * (10 ** 10 - 10 + 1) + 10);
		this.name = name;
		this.parent_id = parent ? parent.id : null;
		this.parents = parent ? [...parent.parents, parent.id] : [];
	}
}
