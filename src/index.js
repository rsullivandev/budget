import React from 'react';
import ReactDOM from 'react-dom';
import './client/css/index.css';
import BudgetScreen from './client/screens/BudgetScreen.js';
import BudgetItemScreen from './client/screens/BudgetItemScreen.js';
import TransactionScreen from './client/screens/TransactionScreen.js';
// import TestRouter from './testRouter.js';
// import TestRouter2 from './testRouter2.js';
import { HashRouter as Router, Switch, Route, Redirect, Link, useRouteMatch, useParams, NavLink } from "react-router-dom";





ReactDOM.render(
    <React.StrictMode>
        <Router>
            <p>Welcome to Rob Mint</p>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <NavLink style={{marginRight: '10px'}} to="/budgets">Budgets</NavLink>
                <NavLink style={{marginRight: '10px'}} to="budgets/2">Items</NavLink>
                <NavLink style={{marginRight: '10px'}} to="/transactions">Transactions</NavLink>
            </div>
            <Switch>
                <Route exact path='/'><Redirect to='/budgets' /></Route>
                <Route exact path='/budgets'><BudgetScreen /></Route>
                <Route path='/budgets/:id'><BudgetItemScreen /></Route>
                <Route path='/transactions'><TransactionScreen /></Route>
            </Switch>
        </Router>

    </React.StrictMode>,
    document.getElementById('main')
)