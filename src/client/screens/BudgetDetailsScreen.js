import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useHistory, useParams, withRouter } from "react-router-dom";
import { currencyFormatter } from '../services/formatter.js';

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this budget", flex: .1 },
    { field: 'budgetHeaderId', headerName: 'Budget', description: "The budget this line item belongs to", flex: .1 },
    {
        field: 'category', headerName: 'Category', description: "The type of the line item", flex: .2,
        valueGetter: (params) => {
            return params.row.category.categoryName
        }
    },
    {
        field: 'categoryDescription', headerName: 'Description', description: "The description of the line item", flex: .2,
        valueGetter: (params) => {
            return params.row.category.description
        }
    },
    { field: 'plannedAmount', headerName: 'Planned Amount', description: "The total amount planned to be spent for this item", flex: .2 },
    {
        field: 'actualAmount', headerName: 'Actual Amount', description: "The actual amount spent for this item", flex: .2,
        valueGetter: (params) => {
            if (params.row.transactions != null) {
                let sum = 0;
                params.row.transactions.forEach(transaction => {
                    sum += transaction.amount;
                })
                return currencyFormatter(sum);
            } else {
                return "";
            }
        }
    },
    {
        field: 'net', headerName: 'Net Amount', description: "The net difference between planned and actual for this budget", flex: .2,
        valueGetter: (params) => {
            let sum = params.getValue(params.id, "plannedAmount") - params.getValue(params.id, "actualAmount");
            return currencyFormatter(sum)
        }
    },

];

class BudgetDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount = async () => {
        console.log(this.props.props)
        const { id } = this.props.match.params;
        try {
            const data = await (await fetch(`/api/budgetHeaders/${id}`)).json();
            this.setState({
                items: data[0].budgetItems
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        console.log("Clicked!");
        console.log(event);
        this.props.history.push(`/transactions`)
        // this.props.history.push(`/budgets/${event.id}`)
    }

    render() {
        const { items } = this.state;
        const { props } = this.props;

        console.log(props);

        return (
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <h2>Budget {this.props.match.params.id} Details</h2>
                        <DataGrid columns={columns} rows={items} onRowClick={this.handleClick} />
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(BudgetDetailsScreen);