import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import NewBudgetForm from '../components/newBudget.js'
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useHistory, useParams, withRouter } from "react-router-dom";
import { budgetDateFormatter, currencyFormatter } from '../services/formatter.js';



const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this budget", flex: .2 },
    {
        field: 'date', headerName: 'Date', descrition: "The month this budget is effective for - set for a given month and year.", flex: .2,
        valueFormatter: (params) => { //TODO need to find a better way to store dates in UTC.
            return budgetDateFormatter(params.value);
        }
    },
    {
        field: 'planned', headerName: 'Planned Amount', description: "The total amount planned to be spent for this budget", flex: .2,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                sum += item.plannedAmount;
            });
            // return (Math.round(sum * 100) / 100).toFixed(2);
            return currencyFormatter(sum);
        }
    },
    {
        field: 'actual', headerName: 'Actual Amount', description: "The actual amount spent for this budget", flex: .2,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                item.transactions.forEach(transaction => {
                    sum += transaction.amount;
                })
            });

            return currencyFormatter(sum);
        }
    },
    {
        field: 'net', headerName: 'Net Amount', description: "The net difference between planned and actual for this budget", flex: .2,
        valueGetter: (params) => {
            let sum = params.getValue(params.id, "planned") - params.getValue(params.id, "actual");
            return currencyFormatter(sum)
        }
    },

];

// const history = useHistory();

class BudgetScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: []
        }
    }



    componentDidMount = async () => {
        try {
            const data = await (await fetch('/api/budgetHeaders')).json();
            this.setState({
                budget: data
            })

            this.props.props.setBudgetState(data);
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        console.log("Clicked!");
        console.log(event);
        this.props.props.setSelectedBudget(event.id)
        // this.props.history.push(`/about`)
        this.props.history.push(`/budgets/${event.id}`)
    }


    render() {
        const { budget } = this.state;
        return (
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <h2>Budgets</h2>
                        <DataGrid columns={columns} rows={budget} onRowClick={this.handleClick} />
                        <NewBudgetForm />
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(BudgetScreen); //needed for click handler to update history