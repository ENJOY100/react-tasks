import React, { Component } from 'react';
import '../assets/core_blocks/Tree.css'

import Button from '../components/Button';

class TodosTreeItem extends Component {
    render() {
        let todosState = this.props.el.opened ? 'opened' : '';
        let todosTreeItemClass = `tree-list__item ${todosState}`;
        let isopened = this.props.el.opened ? 'opened' : 'closed';
        return (
            <li className={todosTreeItemClass}>
                <div className="tree-list__body" onClick={() => this.props.openCategory(this.props.el)}>
                    <div className="r ai-c cp-0">
                        <div className="col-5 t-c">
                            <Button preset="open" />
                        </div>
                        <div className="col-50">
                            <div className="tree-list__name">
                                {this.props.el.name}
                            </div>
                            <Button preset="edit" />
                            {isopened}
                        </div>
                        <div className="col-45 t-r">
                            <Button preset="delete" />
                            <Button preset="add" />
                        </div>
                    </div>
                </div>

                {/*<ul className="tree-list">
                    <li className="tree-list__item">
                        <div className="tree-list__body">
                            <div className="r ai-c cp-0">
                                <div className="col-5">
                                    <Button preset="open" />
                                </div>
                                <div className="col-50">
                                    <div className="tree-list__name">
                                        Category
                                    </div>
                                    <Button preset="edit" />
                                </div>
                                <div className="col-45 t-r">
                                    <Button preset="delete" />
                                    <Button preset="add" />
                                </div>
                            </div>
                        </div>

                    </li>
                </ul>*/}
            </li>
        )
    }
}

export default TodosTreeItem;