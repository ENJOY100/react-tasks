import React, { Component } from 'react';
import './error.scss';

export class ErrorPage extends Component {
    render() {
        return (
            <div className="c">
                <div className="error ptb-30">404 page not found</div>
            </div>
        )
    }
}