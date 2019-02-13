import { Component } from 'react';

export default class Category extends Component {
    constructor(name, parentID) {
        super();
        this.id = Math.floor(Math.random() * (10**10 - 10 + 1) + 10);
        this.name = name;
        this.items = [];
        this.opened = false;
        this.parentID = parentID;
    }
}