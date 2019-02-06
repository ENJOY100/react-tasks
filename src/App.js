import React, {Component} from 'react';

import InsertBlock from './components/InsertBlock';
import CheckButton from './components/CheckButton';
import SearchInput from './components/SearchInput';
import Tree from './components/Tree';

import '../node_modules/aline.css/dist/aline.min.css';
import './assets/css/core.css';

class App extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <section className="app">
                    <div className="c">

                        <div className="app__header ptb-20">
                            <div className="r ai-c">

                                <div className="col-30">
                                    <div className="app__left">
                                        <InsertBlock placeholderName="Enter category titles" style={{width: '80%'}} />
                                    </div>
                                </div>

                                <div className="col-70">
                                    <div className="app__right">
                                        <div className="r ai-c cp-5">
                                            <div className="col-15">
                                                <CheckButton text="Show more"/>
                                            </div>
                                            <div className="col-40">
                                                <SearchInput placeholderName="Search" />
                                            </div>
                                            <div className="col-45">
                                                <InsertBlock placeholderName="Text input with button" style={{width: '100%'}} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="app__body">
                            <div className="r h-100 ai-str">

                                <div className="col-30">
                                    <div className="app__body-left h-100">
                                        <Tree />
                                    </div>
                                </div>

                                <div className="col-70">
                                    <div className="app__body-right">

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default App;
