import React, { Component } from 'react';
import '../assets/core_blocks/TodosTree.css'

import Button from '../components/Button';

class TodosTreeItem extends Component {
    render() {
        let childrenCat = this.props.todos.filter((el) => {
            return el.parentID == this.props.el.id;
        });
        let todosState = this.props.el.opened && childrenCat.length > 0 ? 'opened' : '';
        let todosTreeItemClass = `tree-list__item ${todosState}`;

        let isopened = this.props.el.opened && childrenCat.length ? 'opened' : 'closed'; // индикатор, удалить после завершения

        childrenCat = childrenCat.map(el =>
            <TodosTreeItem
                key={el.id}
                el={el}
                todos={this.props.todos}
                parentEl={this.props.el}
                showTodos={this.props.showTodos}
                deleteCategory={this.props.deleteCategory}
                modalOpen={this.props.modalOpen}
                modalAdd={this.props.modalAdd}
                openList={this.props.openList}
            />
        )

        return (
            <li className={todosTreeItemClass}>
                <div className="tree-list__body" onClick={(event) => this.props.showTodos(this.props.el, event)}>
                    <div className="r ai-c cp-0">
                        <div className="col-5 t-c">
                            { childrenCat.length > 0 &&
                                <div className="tree-list__button" onClick={(event) => this.props.openList(this.props.el, this.props.parentEl, event)}>
                                    <Button preset="open" />
                                </div>
                            }
                        </div>
                        <div className="col-50">
                            <div className="tree-list__name">
                                {this.props.el.name}
                            </div>
                            <div className="tree-list__button">
                                <Button preset="edit" />
                            </div>
                            {isopened}
                        </div>
                        <div className="col-45 t-r">
                            <div className="tree-list__button" onClick={(event) => this.props.deleteCategory(this.props.el, this.props.parentID, event)}>
                                <Button preset="delete" />
                            </div>
                            <div className="tree-list__button" onClick={(event) => this.props.modalOpen('add', this.props.el, this.props.el.id, event)}>
                                <Button preset="add" />
                            </div>
                        </div>
                    </div>
                </div>


                { childrenCat.length > 0 &&
                    <ul className="tree-list">
                        {childrenCat}
                    </ul>
                }

            </li>
        )
    }
}

export default TodosTreeItem;