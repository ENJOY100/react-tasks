import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mainReducer from './store';

import Todos from './pages/todos';
import Modal from './components/modal';
import ErrorPage from './pages/error-page';
import ErrorMessage from './components/error-message';

import 'aline.css/dist/aline.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './_colors.scss';
import './_fonts.scss';
import './App.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	mainReducer,
	composeEnhancers(applyMiddleware(thunk))
);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Redirect exact from="/" to="/category" />
						<Route strict path="/category/:category_id?" component={Todos} />
						<Route path="*" component={ErrorPage} />
					</Switch>
				</Router>
				<Modal />
				<ErrorMessage />
			</Provider>
		);
	}
}

export default App;
