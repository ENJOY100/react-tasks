import React, {Component} from 'react';

import './App.scss';
import 'aline.css/dist/aline.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Todos from "./pages/todos";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Todos />
            </React.Fragment>
        );
    }
}

export default App;