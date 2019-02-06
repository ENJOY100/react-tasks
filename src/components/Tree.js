import React, { Component } from 'react';
import '../assets/core_blocks/Tree.css'

class Tree extends Component {
    render() {
        return (
            <div className="tree">
                <ul className="tree-list">

                    <li className="tree-list__item">
                        <div className="tree-list__body">
                            <div className="r ai-c cp-0">
                                <div className="col-5">
                                    <div className="tree-list__button tree-list__button--open">^</div>
                                </div>
                                <div className="col-50">
                                    <div className="tree-list__name">
                                        Category
                                    </div>
                                    <div className="tree-list__button tree-list__button--edit">
                                        ред. {/*Потом сделать кнопку норм*/}
                                    </div>
                                </div>
                                <div className="col-45 t-r">
                                    <div className="tree-list__button tree-list__button--delete">
                                        уд. {/*Потом сделать кнопку норм*/}
                                    </div>
                                    <div className="tree-list__button tree-list__button--add">
                                        + {/*Потом сделать кнопку норм*/}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className="tree-list__sublist">
                            <li className="tree-list__sublist-item">
                                <div className="tree-list__body">
                                    <div className="r ai-c cp-0">
                                        <div className="col-5">
                                            <div className="tree-list__button tree-list__button--open">^</div>
                                        </div>
                                        <div className="col-50">
                                            <div className="tree-list__name">
                                                Category
                                            </div>
                                            <div className="tree-list__button tree-list__button--edit">
                                                ред. {/*Потом сделать кнопку норм*/}
                                            </div>
                                        </div>
                                        <div className="col-45 t-r">
                                            <div className="tree-list__button tree-list__button--delete">
                                                уд. {/*Потом сделать кнопку норм*/}
                                            </div>
                                            <div className="tree-list__button tree-list__button--add">
                                                + {/*Потом сделать кнопку норм*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        )
    }
}

export default Tree;