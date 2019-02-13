import React from 'react';

import InsertBlock from '../../components/insert-block';
import CheckButton from '../../components/checkbtn';
import SearchBlock from '../../components/search-block';
import TodosTree from '../../components/todos/tree';
import TodosView from '../../components/todos/view';
import Modal from "../../components/modal";

export const View = (props) => {
    const {
        todos,
        input,
        modal,
        addCategory,
        inputValueHandler,
        searchValueChange,
        inputValueClear,
        addTodo,
        treeClear,
        showTodos,
        deleteCategory,
        modalOpen,
        modalClose,
        openList,
        selectCategory,
        addSubCategory,
        editCategory,
        editTodo,
        singleTodoCheck
    } = props;
    return (
        <section className="app">
            <div className="c">

                <div className="app__header ptb-20">
                    <div className="r ai-c">

                        <div className="col-30">
                            <div className="app__left">
                                <InsertBlock
                                    placeholderName="Enter category titles"
                                    clickEvent={addCategory}
                                    changeEvent={inputValueHandler}
                                    value={input.categoryValue}
                                    name="categoryValue"
                                />
                            </div>
                        </div>

                        <div className="col-70">
                            <div className="app__right">
                                <div className="r ai-c cp-5">
                                    <div className="col-15">
                                        <CheckButton
                                            text="Show done"
                                            name="showValue"
                                            input={input}
                                            changeEvent={inputValueHandler}
                                        />
                                    </div>
                                    <div className="col-40">
                                        <SearchBlock
                                            placeholderName="Search"
                                            input={input}
                                            changeEvent={searchValueChange}
                                            clearSearchInput={inputValueClear}
                                            name="searchValue"
                                        />
                                    </div>
                                    <div className="col-45">
                                        <InsertBlock
                                            placeholderName="Text input with button"
                                            clickEvent={addTodo}
                                            changeEvent={inputValueHandler}
                                            value={input.todoValue}
                                            name="todoValue"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="app__body pt-30">
                    <div className="r h-100 ai-str">

                        <div className="col-30 h-100">
                            <div className="app__body-left h-100">
                                { todos.fetch.length > 15 &&
                                <button className="btn btn-ui mb-10" onClick={treeClear}>
                                    Очистить Список
                                </button>
                                }
                                <TodosTree
                                    todos={todos}
                                    showTodos={showTodos}
                                    deleteCategory={deleteCategory}
                                    modalOpen={modalOpen}
                                    openList={openList}
                                />
                            </div>
                        </div>

                        <div className="col-70 h-100">
                            <div className="app__body-right h-100">
                                {/*{ this.props.children }*/}
                                <TodosView
                                    todos={todos}
                                    modalOpen={modalOpen}
                                    input={input}
                                    singleTodoCheck={singleTodoCheck}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <Modal
                todos={todos}
                input={input}
                modal={modal}
                modalClose={modalClose}
                inputValueHandler={inputValueHandler}
                openList={openList}
                selectCategory={selectCategory}
                addSubCategory={addSubCategory}
                editCategory={editCategory}
                editTodo={editTodo}
                inputName="modalNameValue"
                checkName="modalCheckValue"
            />
        </section>
    );
}