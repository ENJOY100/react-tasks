import React, { Component } from 'react';
import '../assets/core_blocks/TodosTree.css'

import Button from '../components/Button';

class TodosTreeItem extends Component {
    render() {
        let treeClickEvent, todosTreeItemClass;
        let childrenCat = this.props.todos.filter((el) => {
            return el.parentID == this.props.el.id;
        });
        let todosState = this.props.el.opened && childrenCat.length > 0 ? 'opened' : '';

        let isopened = this.props.el.opened && childrenCat.length ? 'opened' : 'closed'; // индикатор, удалить после завершения

        if (this.props.showTodos) {
            treeClickEvent = this.props.showTodos;
            todosTreeItemClass = `tree-list__item ${todosState}`;
        } else {
            treeClickEvent = this.props.selectCategory;
            todosTreeItemClass = `tree-list__item tree-list__select-item`;
        }

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
                selectCategory={this.props.selectCategory}
            />
        )

        return (
            <li className={todosTreeItemClass}>
                <div className="tree-list__body" onClick={(event) => {treeClickEvent(this.props.el, event)}}>
                    <div className="r ai-c cp-0">
                        <div className="col-5 t-c">
                            { childrenCat.length > 0 && this.props.openList &&
                                <div className="tree-list__button" onClick={(event) => this.props.openList(this.props.el, event)}>
                                    <Button preset="open" />
                                </div>
                            }
                        </div>
                        <div className="col-50">
                            <div className="tree-list__name">
                                {this.props.el.name}
                            </div>
                            { this.props.modalOpen &&
                                <div className="tree-list__button" onClick={(event) => this.props.modalOpen('editcat', this.props.el, event)}>
                                    <Button preset="edit" />
                                </div>
                            }
                            {isopened}
                        </div>
                        <div className="col-45 t-r">
                            { this.props.deleteCategory &&
                                <div className="tree-list__button" onClick={(event) => this.props.deleteCategory(this.props.el, event)}>
                                    <Button preset="delete" />
                                </div>
                            }
                            { this.props.modalOpen &&
                                <div className="tree-list__button" onClick={(event) => this.props.modalOpen('add', this.props.el, event)}>
                                    <Button preset="add" />
                                </div>
                            }
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