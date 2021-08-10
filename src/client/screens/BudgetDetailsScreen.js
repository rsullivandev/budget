import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from "react-router-dom";
import { currencyFormatter, budgetDateFormatter } from '../services/formatter.js';

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this budget", flex: .5 },
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
    {
        field: 'plannedAmount', headerName: 'Planned Amount', description: "The total amount planned to be spent for this item", flex: 1,
        valueFormatter: (params) => {
            return currencyFormatter(params.value);
        }
    },
    {
        field: 'actualAmount', headerName: 'Actual Amount', description: "The actual amount spent for this item", flex: 1,
        valueGetter: (params) => {
            if (params.row.transactions != null) {

                return params.row.transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
            } else {
                return "";
            }
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value);
        }
    },
    {
        field: 'net', headerName: 'Net Amount', description: "The net difference between planned and actual for this budget", flex: 1,
        valueGetter: (params) => {
            return params.getValue(params.id, "actualAmount") - params.getValue(params.id, "plannedAmount")
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value);
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
            },
            date: ""
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

            const date = budgetDateFormatter(new Date(data[0].date));
            let flatTransactions = sortedData.flatMap(record => record.transactions);

            let actualIncome = flatTransactions.reduce((a, c) => {
                if (c.amount > 0)
                    a += c.amount
                return a;
            }, 0);

            let actualExpense = flatTransactions.reduce((a, c) => {
                if (c.amount < 0)
                    a += c.amount
                return a;
            }, 0);


            let netActual = actualIncome + actualExpense;

            actualExpense = currencyFormatter(actualExpense);
            actualIncome = currencyFormatter(actualIncome);
            netActual = currencyFormatter(netActual);


            this.setState({
                items: sortedData,
                totals: {
                    actualExpense: actualExpense,
                    actualIncome: actualIncome,
                    netActual: netActual
                },
                date: date
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        const { id } = this.props.match.params;
        console.log("Clicked!");
        console.log(event);
        this.props.history.push(`/budgets/${id}/items/${event.id}`)
    }

    render() {
        const { items } = this.state;

        return (
            <div style={{ height: 800, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <h2>Budget {this.state.date} Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <h3>Actual Income: {this.state.totals.actualIncome}</h3>
                            <h3>Actual Expense: {this.state.totals.actualExpense}</h3>
                            <h3>Net Position: {this.state.totals.netActual}</h3>
                        </div>
                        <DataGrid columns={columns} rows={items} rowHeight={25} onRowClick={this.handleClick} />
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(BudgetDetailsScreen);