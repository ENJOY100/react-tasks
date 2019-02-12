import React, { Component } from 'react';
import '../tree/tree.scss'

import Button from '../../button';

export default class TodosTreeItem extends Component {
    render() {
        const { todos, el, showTodos, selectCategory, deleteCategory, modalOpen, modalAdd, openList } = this.props;
        let treeClickEvent, todosTreeItemClass;

        let childrenCat = todos.filter((item) => {
            return item.parentID === el.id;
        });

        const todosState = el.opened && childrenCat.length > 0 ? 'opened' : '';

        if (showTodos) {
            treeClickEvent = showTodos;
            todosTreeItemClass = `tree-list__item ${todosState}`;
        } else {
            treeClickEvent = selectCategory;
            todosTreeItemClass = `tree-list__item tree-list__select-item`;
        }

        childrenCat = childrenCat.map(el =>
            <TodosTreeItem
                key={el.id}
                el={el}
                todos={todos}
                parentEl={el}
                showTodos={showTodos}
                deleteCategory={deleteCategory}
                modalOpen={modalOpen}
                modalAdd={modalAdd}
                openList={openList}
                selectCategory={selectCategory}
            />
        )

        return (
            <li className={todosTreeItemClass}>
                <div className="tree-list__body" onClick={(event) => {treeClickEvent(el, event)}}>
                    <div className="r ai-c cp-0">
                        <div className="col-5 t-c">
                            { childrenCat.length > 0 && openList &&
                                <div className="tree-list__button" onClick={(event) => openList(el, event)}>
                                    <Button preset="open" />
                                </div>
                            }
                        </div>
                        <div className="col-50">
                            <div className="tree-list__name">
                                {el.name}
                            </div>
                            { modalOpen &&
                                <div className="tree-list__button" onClick={(event) => modalOpen('edit', el, event)}>
                                    <Button preset="edit" />
                                </div>
                            }
                        </div>
                        <div className="col-45 t-r">
                            { deleteCategory &&
                                <div className="tree-list__button" onClick={(event) => deleteCategory(el, event)}>
                                    <Button preset="delete" />
                                </div>
                            }
                            { modalOpen &&
                                <div className="tree-list__button" onClick={(event) => modalOpen('add', el, event)}>
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