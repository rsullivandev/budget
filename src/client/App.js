import React from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import routes from './routes.js'

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
                    <NavLink style={{ marginRight: '10px' }} to="/transactions">Transactions</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="/escrow">Escrow</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="/goals">Goals</NavLink>
                    <NavLink style={{ marginRight: '10px' }} to="/categories">Categories</NavLink>

                </div>
                <Switch>
                    {/* <Route exact path='/'><Redirect to='/budgets' /></Route>
                    <Route exact path='/budgets'><BudgetScreen props={props}/></Route>
                    <Route exact path='/budgets/:id'><BudgetDetailsScreen props={props}/></Route>
                    <Route path='/budgets/:id/items/:id'><ItemDetailsScreen props={props}/></Route>
                    <Route exact path='/transactions'><Redirect to='/budgets' /></Route>
                    <Route exact path='/escrow'><Redirect to='/budgets' /></Route>
                    <Route exact path='/goals'><Redirect to='/budgets' /></Route>
                    <Route exact path='/categories'><Redirect to='/budgets' /></Route> */}

                    {/* //TODO - keep studying routes here...Eventually need to refactor into its own component */}

                    {routes.map(({ path, name, Component }, key) => {
                        console.log(path);
                        console.log(routes);
                        return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={props => {
                                const crumbs = routes
                                    // Get all routes that contain the current one.
                                    .filter(({ path }) => props.match.path.includes(path))
                                    // Swap out any dynamic routes with their param values.
                                    // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                                    .map(({ path, ...rest }) => ({
                                        path: Object.keys(props.match.params).length
                                            ? Object.keys(props.match.params).reduce(
                                                (path, param) => path.replace(
                                                    `:${param}`, props.match.params[param]
                                                ), path
                                            )
                                            : path,
                                        ...rest
                                    }));
                                console.log(`Generated crumbs for ${props.match.path}`);
                                crumbs.map(({ name, path }) => console.log({ name, path }));
                                return (
                                    <div className="p-8">
                                        <Component {...props} />
                                    </div>
                                );
                            }}
                        />
                    )})}



                </Switch>
            </div>
        )
    }
}