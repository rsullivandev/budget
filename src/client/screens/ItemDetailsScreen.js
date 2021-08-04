import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useHistory, useParams, withRouter } from "react-router-dom";
import { budgetDateFormatter } from '../services/formatter.js';

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
    {
        field: 'budget', headerName: 'Budget', description: "The budget this transaction belongs to", flex: .1,
        valueGetter: (params) => {
            if (params.row != null) {
                return params.row.budgetHeaderId
            } else {
                return ""
            }
        }
    },
    {
        field: 'category', headerName: 'Category', description: "The type of the line item", flex: .2,
        valueGetter: (params) => {
            if (params.row != null) {
                return params.row.categoryId;
            } else {
                return "";
            }
        }
    }
];

class ItemDetailsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: []
        }
    }

    componentDidMount = async () => {
        try {
            const {id } = this.props.match.params;
            const data = await (await fetch(`/api/budgetItems/${id}`)).json();
            this.setState({
                transactions: data[0].transactions
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
                    <div style={{ flexGrow: 1 }}>
                        <h2>Transactions</h2>
                        <DataGrid columns={columns} rows={transactions} onRowClick={this.handleClick} />
                    </div>
                </div>
            </div >
        )
    }

}

export default withRouter(ItemDetailsScreen);