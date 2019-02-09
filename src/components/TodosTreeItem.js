import React, { Component } from 'react';
import '../assets/core_blocks/TodosTree.css'

import Button from '../components/Button';

class TodosTreeItem extends Component {
    render() {
        let todosState = this.props.el.opened ? 'opened' : '';
        let todosTreeItemClass = `tree-list__item ${todosState}`;
        let isopened = this.props.el.opened ? 'opened' : 'closed';

        let childrenCat = this.props.el.children.map(el =>
            <TodosTreeItem
                key={el.id}
                el={el}
                parentEl={this.props.el}
                openCategory={this.props.openCategory}
                deleteCategory={this.props.deleteCategory}
                modalOpen={this.props.modalOpen}
                modalAdd={this.props.modalAdd}
            />
        )

        return (
            <li className={todosTreeItemClass}>
                <div className="tree-list__body" onClick={(event) => this.props.openCategory(this.props.el, event)}>
                    <div className="r ai-c cp-0">
                        <div className="col-5 t-c">
                            <div className="tree-list__button" onClick={(event) => this.props.openList(this.props.el, this.props.parentEl, event)}>
                                <Button preset="open" />
                            </div>
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
                            <div className="tree-list__button" onClick={(event) => this.props.deleteCategory(this.props.el, this.props.parentEl, event)}>
                                <Button preset="delete" />
                            </div>
                            <div className="tree-list__button" onClick={(event) => this.props.modalOpen('add', this.props.el, this.props.parentEl, event)}>
                                <Button preset="add" />
                            </div>
                        </div>
                    </div>
                </div>

                { this.props.el.children.length > 0 &&
                    <ul className="tree-list">
                        {childrenCat}
                    </ul>
                }

            </li>
        )
    }
}

export default TodosTreeItem;