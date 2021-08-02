import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useHistory, useParams, withRouter } from "react-router-dom";

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this transaction", flex: .1 },
    {
        field: 'date', headerName: 'Date', description: "The date this transaction was executed", flex: .1,
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${date.getUTCDate()}/${date.getUTCFullYear()}` //Adding 0 digit for single digit months
        }
    },
    { field: 'description', headerName: 'Description', description: "The descriptiono of this transaction", flex: .1 },
    { field: 'amount', headerName: 'Amount', description: "The value of this transaction", flex: .1 },

    //TODO - figure out how to show links back to budget and category if data contains records
    // - with no linkage.

    // {
    //     field: 'budget', headerName: 'Budget', description: "The budget this transaction belongs to", flex: .1,
    //     valueGetter: (params) => {
    //         return params.row.budgetHeader.date
    //     }
    // },
    // {
    //     field: 'category', headerName: 'Category', description: "The type of the line item", flex: .2,
    //     valueGetter: (params) => {
    //         return params.row.category.categoryName
    //     }
    // }
];

export default class TransactionScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: []
        }
    }

    componentDidMount = async () => {
        try {
            const data = await (await fetch('/api/transactions')).json();
            this.setState({
                transactions: data
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        console.log("Clicked!");
        console.log(event);
        // this.props.history.push(`/about`)
        // this.props.history.push(`/budgets/${event.id}`)
    }

    render() {
        const { transactions } = this.state;
        return (
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>S
                        <DataGrid columns={columns} rows={transactions} onRowClick={this.handleClick} />
                    </div>
                </div>
            </div >
        )
    }

}