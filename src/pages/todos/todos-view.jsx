import React from 'react';
import PropTypes from 'prop-types';

import InsertBlock from '../../components/insert-block';
import CheckButton from '../../components/checkbtn';
import SearchBlock from '../../components/search-block';
import CategoriesTree from './categories-tree';
import TodoList from './todo-list';

export const View = props => {
	const {
		show_value,
		inputChanger,
		addCategory,
		showTodoItems,
		addTodo,
		modalOpen,
		selected_category_id,
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
											value={show_value}
											changeEvent={event =>
												inputChanger(
													event.target.checked,
													'show_value'
												)
											}
										/>
									</div>
									<div className="col-40 col-xs-50">
										<SearchBlock
											name="search_value"
											placeholderName="Search"
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
								<CategoriesTree
									showTodoItems={showTodoItems}
									modalOpen={modalOpen}
								/>
							</div>
						</div>

						<div className="col-70 col-s-60 col-xs-100 mt-xs-15 h-100 h-xs-auto">
							<div className="app__body-right h-100 h-xs-auto">
								<TodoList
									modalOpen={modalOpen}
									selected_category_id={selected_category_id}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

View.propTypes = {
	show_value: PropTypes.bool,
	inputChanger: PropTypes.func,
	addCategory: PropTypes.func,
	showTodoItems: PropTypes.func,
	addTodo: PropTypes.func,
	modalOpen: PropTypes.func,
	selected_category_id: PropTypes.string,
};
