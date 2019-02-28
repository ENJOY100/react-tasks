import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/button';

export const View = (props) => {
    const {
        category,
        modalOpen,
        deleteCategory,
        openList,
        todosTreeItemClass,
        childrenCategories,
        treeClickEvent
    } = props;

    return (
        <li className={todosTreeItemClass}>

            <div className="tree-list__body" onClick={() => {treeClickEvent(category)}}>
                <div className="r ai-c cp-0">
                    <div className="col-5 t-c">
                        { childrenCategories.length > 0 && openList &&
                            <div className="tree-list__button" onClick={(event) => openList(category, event)}>
                                <Button preset="open" />
                            </div>
                        }
                    </div>
                    <div className="col-50">
                        <div className="tree-list__name">
                            { category.name }
                        </div>
                        { modalOpen &&
                            <div className="tree-list__button" onClick={(event) => modalOpen('edit', category, event)}>
                                <Button preset="edit" />
                            </div>
                        }
                    </div>
                    <div className="col-45 t-r">
                        { deleteCategory &&
                            <div className="tree-list__button" onClick={(event) => deleteCategory(category, event)}>
                                <Button preset="delete" />
                            </div>
                        }
                        { modalOpen &&
                            <div className="tree-list__button" onClick={(event) => modalOpen('add', category, event)}>
                                <Button preset="add" />
                            </div>
                        }
                    </div>
                </div>
            </div>

            { childrenCategories.length > 0 &&
                <ul className="tree-list">
                    { childrenCategories }
                </ul>
            }

        </li>
    )
}

View.propTypes = {
    category: PropTypes.shape({
        name: PropTypes.string
    }),
    deleteCategory: PropTypes.func,
    modalOpen: PropTypes.func,
    openList: PropTypes.func,
    todosTreeItemClass: PropTypes.string,
    childrenList: PropTypes.array,
    treeClickEvent: PropTypes.func
}