import React, {Component} from 'react';

import 'aline.css/dist/aline.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.scss';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}

export default App;