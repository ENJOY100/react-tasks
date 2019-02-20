import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'aline.css/dist/aline.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.scss';

class App extends Component {
    render() {
        const children = this.props.children;
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired
};

export default App;