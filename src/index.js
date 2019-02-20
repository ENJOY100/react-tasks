import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Todos from "./pages/todos";
import ErrorPage from "./pages/error-page";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Todos} />
                <Route path="/category/:slug" component={Todos} />
                <Route path="*" component={ErrorPage} />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
