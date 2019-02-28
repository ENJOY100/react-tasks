import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mainReducer from './store';

import Todos from "./pages/todos";
import ErrorPage from "./pages/error-page";

import 'aline.css/dist/aline.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './_colors.scss';
import './_fonts.scss';
import './App.scss';

const store = createStore(mainReducer, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Todos} />
                        <Route path="/category/:slug" component={Todos} />
                        <Route path="*" component={ErrorPage} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;