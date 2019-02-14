import React from 'react';
import Button from '../../button';

export const View = (props) => {
    const { el, deleteCategory, modalOpen, openList, todosTreeItemClass, childrenCat, treeClickEvent } = props;
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
    );
}