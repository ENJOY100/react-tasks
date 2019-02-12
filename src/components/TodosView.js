import React, { Component } from 'react';
import TodoItem from './TodoItem';
import '../assets/core_blocks/TodosView.css';

class TodosView extends Component {
    render() {
        let todosView, todosFetch;

        if (this.props.todosView && this.props.todosView.items) {
            if (this.props.showDoneValue) {
                todosFetch = this.props.todosView.items.filter((el) => {
                    return el.checked;
                });
            } else {
                todosFetch = this.props.todosView.items;
            }
        }

        if (this.props.searchValue && this.props.todosView && this.props.todosView.items) {
            todosFetch = this.props.todosView.items.filter((el) => {
                return el.name.indexOf(this.props.searchValue) !== -1;
            });
        }

        if (this.props.todosView && this.props.todosView.items) {
            todosFetch = todosFetch.map(el =>
                <TodoItem
                    key={el.id}
                    el={el}
                    modalOpen={this.props.modalOpen}
                />
            );

            let alertText;
            if (!todosFetch.length && this.props.searchValue || this.props.showDoneValue) {
                alertText = 'No match found';
            } else if (!todosFetch.length) {
                alertText = 'Todos is null, please add';
            }

            todosView = todosFetch.length > 0 ? todosFetch : alertText;

        }
        return (
            <ul className="todo-list">
                { todosView }
            </ul>
        )
    }
}

export default TodosView;