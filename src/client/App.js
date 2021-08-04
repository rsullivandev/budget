import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect, Link, useRouteMatch, useParams, NavLink } from "react-router-dom";
import BudgetScreen from './screens/BudgetScreen.js';
import BudgetItemScreen from './screens/BudgetDetailsScreen.js';
import ItemDetailsScreen from './screens/ItemDetailsScreen.js';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            budget: [],
            selectedBudget: ""
        }
    }

    setBudgetState = (budget) => {
        this.setState({
            budget: budget
        })
    }

    // setSelectedBudget = (selectedBudget) => {
    //     this.setState({
    //         selectedBudget: selectedBudget
    //     })
    // }

//TODO - Add breadcrumb nav
//TODO - Update database on transaction import


    render() {
        let props = {
            budget: this.state.budget,
            setBudgetState: this.setBudgetState,
            // selectedBudget: this.state.selectedBudget,
            // setSelectedBudget: this.setSelectedBudget
        }
        return (
            <div>
                <p>Welcome to Rob Mint</p>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <NavLink style={{ marginRight: '10px' }} to="/budgets">Budgets</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="budgets/2">Items</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="/transactions">Transactions</NavLink>
                </div>
                <Switch>
                    <Route exact path='/'><Redirect to='/budgets' /></Route>
                    <Route exact path='/budgets'><BudgetScreen props={props}/></Route>
                    <Route exact path='/budgets/:id'><BudgetItemScreen props={props}/></Route>
                    <Route path='/budgets/:id/items/:id'><ItemDetailsScreen props={props}/></Route>
                </Switch>
            </div>
        )
    }
}