import React, {Component} from 'react';

import InsertBlock from './components/InsertBlock'

import '../node_modules/aline.css/dist/aline.min.css';
import './assets/css/core.css';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="app ptb-30">
                    <div className="c">

                        <div className="app__header">
                            <div className="r">
                                <div className="col-30">
                                    <InsertBlock placeholderName="Enter category title" />
                                </div>
                                <div className="col-70">

                                </div>
                            </div>
                        </div>

                        <div className="app__body">

                        </div>

                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default App;
