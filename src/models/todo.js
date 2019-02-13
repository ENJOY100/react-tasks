import { Component } from 'react';

export default class Todo extends Component {
    constructor(name) {
        super();
        this.id = Math.floor(Math.random() * (10**10 - 10 + 1) + 10);
        this.name = name;
        this.checked = false;
    }
}