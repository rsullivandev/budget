import React from 'react';
import ReactDOM from 'react-dom';
import './client/css/index.css';
import BudgetScreen from './client/screens/BudgetScreen.js';
// import TestRouter from './testRouter.js';
// import TestRouter2 from './testRouter2.js';
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";





ReactDOM.render(
    <React.StrictMode>
        <Router>
            <p>Welcome to Rob Mint</p>
            <BudgetScreen />
            {/* <TestRouter /> */}
            {/* <TestRouter2 /> */}
        </Router>

    </React.StrictMode>,
    document.getElementById('main')
)