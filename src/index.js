import React from 'react';
import ReactDOM from 'react-dom';
import './client/css/index.css';
import BudgetScreen from './client/screens/BudgetScreen.js';
import BudgetItemScreen from './client/screens/BudgetItemScreen.js';
import TransactionScreen from './client/screens/TransactionScreen.js';
// import TestRouter from './testRouter.js';
// import TestRouter2 from './testRouter2.js';
import { HashRouter as Router, Switch, Route, Redirect, Link, useRouteMatch, useParams } from "react-router-dom";





ReactDOM.render(
    <React.StrictMode>
        <Router>
            <p>Welcome to Rob Mint</p>
            {/* <BudgetScreen /> */}
            {/* <TestRouter /> */}
            {/* <TestRouter2 /> */}
            <Switch>
                <Route exact path='/'><Redirect to='/budgets'/></Route>
                <Route exact path='/budgets'><BudgetScreen/></Route>
                <Route path='/budgets/:id'><BudgetItemScreen/></Route>
                <Route path='/transactions'><TransactionScreen/></Route>
            </Switch>
        </Router>

    </React.StrictMode>,
    document.getElementById('main')
)