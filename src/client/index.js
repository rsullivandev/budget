import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { HashRouter as Router, Switch, Route, Redirect, Link, useRouteMatch, useParams, NavLink } from "react-router-dom";
import App from './App.js';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>

    </React.StrictMode>,
    document.getElementById('main')
)