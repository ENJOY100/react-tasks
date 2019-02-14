export default class Todo {
    constructor(name) {
        this.id = Math.floor(Math.random() * (10**10 - 10 + 1) + 10);
        this.name = name;
        this.checked = false;
    }
}