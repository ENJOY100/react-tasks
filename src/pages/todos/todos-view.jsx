import React from 'react';
import PropTypes from 'prop-types';

import InsertBlock from '../../components/insert-block';
import CheckButton from '../../components/checkbtn';
import SearchBlock from '../../components/search-block';
import TodosTree from './todo-tree';
import TodosList from './todo-list';
import Modal from "../../components/modal";

export const View = (props) => {

    const {
        todos,
        input,
        modal,
        inputChanger,
        addCategory,
        showTodos,
        addTodo,
        modalOpen,
        treeClear
    } = props;

    return (
        <section className="app">
            <div className="c">

                <div className="app__header ptb-20">
                    <div className="r ai-c">

                        <div className="col-30 col-s-100">
                            <div className="app__left">
                                <InsertBlock
                                    placeholderName="Enter category title"
                                    clickEvent={addCategory}
                                />
                            </div>
                        </div>

                        <div className="col-70 col-s-100 mt-s-10">
                            <div className="app__right">
                                <div className="r ai-c cp-5">
                                    <div className="col-15 col-xs-50">
                                        <CheckButton
                                            text="Show done"
                                            value={input.showValue}
                                            changeEvent={(event) => inputChanger(event.target.checked, 'showValue')}
                                        />
                                    </div>
                                    <div className="col-40 col-xs-50">
                                        <SearchBlock
                                            name="searchValue"
                                            placeholderName="Search"
                                            todos={todos}
                                            changeEvent={inputChanger}
                                        />
                                    </div>
                                    <div className="col-45 col-xs-100 mt-xs-10">
                                        <InsertBlock
                                            placeholderName="Text input with button"
                                            clickEvent={addTodo}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="app__body pt-30 pt-xs-15">
                    <div className="r h-100 ai-str">

                        <div className="col-30 col-s-40 col-xs-100 h-100 h-xs-auto">
                            <div className="app__body-left h-100 h-xs-auto">
                                { todos.fetch.length > 15 &&
                                    <button className="btn btn-ui mb-10" onClick={treeClear}>
                                        Clear Tree
                                    </button>
                                }
                                <TodosTree
                                    showTodos={showTodos}
                                    modalOpen={modalOpen}
                                />
                            </div>
                        </div>

                        <div className="col-70 col-s-60 col-xs-100 mt-xs-15 h-100 h-xs-auto">
                            <div className="app__body-right h-100 h-xs-auto">
                                <TodosList
                                    modalOpen={modalOpen}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            { !modal.hidden &&
                <Modal
                    modalOpen={modalOpen}
                />
            }

        </section>
    )
}

View.propTypes = {
    todos: PropTypes.shape({
        fetch: PropTypes.array
    }),
    input: PropTypes.shape({
        showValue: PropTypes.bool
    }),
    modal: PropTypes.shape({
        hidden: PropTypes.bool
    }),
    inputChanger: PropTypes.func,
    addCategory: PropTypes.func,
    showTodos: PropTypes.func,
    addTodo: PropTypes.func,
    modalOpen: PropTypes.func,
    treeClear: PropTypes.func
}