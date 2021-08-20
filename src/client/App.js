import React from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import routes from './routes.js'
import MyBreadcrumb from './components/MyBreadcrumb.js';
import Header from './components/Header.js';

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


    //TODO - Update database on transaction import


    render() {
        let props = {
            budget: this.state.budget,
            setBudgetState: this.setBudgetState,
        }
        return (
            <div>
                <Header />
                <Switch>
                    {routes.map(({ path, Component }, key) => {
                        return (
                            <Route
                                exact
                                path={path}
                                key={key}
                                render={props => {
                                    const crumbs = routes
                                        .filter(({ path }) => props.match.path.includes(path))
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
                                        <div style={{marginTop: "1em"}}>
                                            <MyBreadcrumb crumbs={crumbs} />
                                            <Component {...props} />
                                        </div>
                                    );
                                }}
                            />
                        )
                    })}
                </Switch>
            </div>
        )
    }
}