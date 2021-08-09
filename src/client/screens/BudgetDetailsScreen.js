import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useHistory, useParams, withRouter } from "react-router-dom";
import { currencyFormatter } from '../services/formatter.js';

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this budget", flex: .5 },
    // { field: 'budgetHeaderId', headerName: 'Budget', description: "The budget this line item belongs to", flex: .1 },
    {
        field: 'category', headerName: 'Category', description: "The type of the line item", flex: 1,
        valueGetter: (params) => {
            return params.row.category.categoryName
        }
    },
    {
        field: 'categoryDescription', headerName: 'Description', description: "The description of the line item", flex: 1.5,
        valueGetter: (params) => {
            return params.row.category.description
        }
    },
    { field: 'plannedAmount', headerName: 'Planned Amount', description: "The total amount planned to be spent for this item", flex: 1 },
    {
        field: 'actualAmount', headerName: 'Actual Amount', description: "The actual amount spent for this item", flex: 1,
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
        field: 'net', headerName: 'Net Amount', description: "The net difference between planned and actual for this budget", flex: 1,
        valueGetter: (params) => {
            let sum = Number(params.getValue(params.id, "actualAmount")) - Number(params.getValue(params.id, "plannedAmount"));
            return currencyFormatter(sum)
        }
    },

];

class BudgetDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            totals: {
                plannedIncome: 0,
                actualIncome: 0,
                plannedExpense: 0,
                actualExpense: 0,
                netActual: 0,
            }
        }
    }

    componentDidMount = async () => {
        console.log(this.props.props)
        const { id } = this.props.match.params;
        try {
            const data = await (await fetch(`/api/budgetHeaders/${id}`)).json();
            const sortedData = data[0].budgetItems.sort((a, b) => {
                return a.plannedAmount - b.plannedAmount;
            });

            let actualExpense = 0;
            let actualIncome = 0;
            let netActual = 0;

            //TODO - actualAmount does not exist on Record. Can this be captured from the datagrid? otherwise will need to recalculate...

            // sortedData.forEach(record => {
            //     record.actualAmount > 0 ? actualIncome += record.actualAmount : actualExpense += record.actualAmount;
            // })

            netActual = actualIncome + actualExpense;

            this.setState({
                items: sortedData,
                actualExpense: actualExpense,
                actualIncome: actualIncome
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        const {id} = this.props.match.params;
        console.log("Clicked!");
        console.log(event);
        // this.props.history.push(`/transactions`)
        this.props.history.push(`/budgets/${id}/items/${event.id}`)
    }

    render() {
        const { items } = this.state;

        return (
            <div style={{ height: 800, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <h2>Budget {this.props.match.params.id} Details</h2>
                        <h3>Actual Expense:{this.state.totals.actualExpense}</h3>
                        <h3>Actual Income: {this.state.totals.actualIncome}</h3>
                        <h3>Net Position: {this.state.totals.netActual}</h3>
                        <DataGrid columns={columns} rows={items} onRowClick={this.handleClick} />
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(BudgetDetailsScreen);