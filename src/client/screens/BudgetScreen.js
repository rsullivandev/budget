import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core'
import NewBudgetForm from '../components/newBudget.js'
import { HashRouter as Router, Switch, Route, Link, useRouteMatch, useHistory, useParams, withRouter } from "react-router-dom";
import { budgetDateFormatter, currencyFormatter } from '../services/formatter.js';



const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this budget", flex: .05 },
    {
        field: 'date', headerName: 'Budget Date', description: "The month this budget is effective for - set for a given month and year.", flex: .1,
        valueFormatter: (params) => { //TODO need to find a better way to store dates in UTC.
            return budgetDateFormatter(params.value);
        }
    },
    {
        field: 'plannedIncome', headerName: 'Planned Income', description: "The total income planned for this budget", flex: .1,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                if (item.plannedAmount > 0) {
                    sum += item.plannedAmount;
                }
            });
            return sum
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value);
        }
    },
    {
        field: 'plannedExpense', headerName: 'Planned Expenses', description: "The total amount planned to be spent for this budget. Expressed as a negative.", flex: .1,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                if (item.plannedAmount < 0) {
                    sum += item.plannedAmount;
                }
            });
            return sum
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value);
        }
    },
    {
        field: 'netPlanned', headerName: 'Net Planned', description: "The net difference between planned expenses and actual income for this budget", flex: .1,
        valueGetter: (params) => {
            return params.getValue(params.id, "plannedIncome") + params.getValue(params.id, "plannedExpense")
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value)
        }
    },
    {
        field: 'actualIncome', headerName: 'Actual Income', description: "The actual income received for this budget", flex: .1,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                if (item.plannedAmount > 0) {
                    item.transactions.forEach(transaction => {
                        sum += transaction.amount;
                    })
                }
            });
            return sum;
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value);
        }
    },
    {
        field: 'actualExpense', headerName: 'Actual Expenses', description: "The actual amount spent for this budget. Expressed as a negative.", flex: .1,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                if (item.plannedAmount < 0) {
                    item.transactions.forEach(transaction => {
                        sum += transaction.amount;
                    })
                }
            });
            return sum
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value);
        }
    },


    //TODO - need to align the categories between what is included in the database and what is determined by the orchestration rules. Currently there are some inconsistencies. Rerun May file.
    {
        field: 'netActuals', headerName: 'Net Actuals', description: "The net difference between actual expenses and actual income for this budget", flex: .1,
        valueGetter: (params) => {
            return params.getValue(params.id, "actualIncome") + params.getValue(params.id, "actualExpense")
        },
        valueFormatter: (params) => {
            return currencyFormatter(params.value)
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

            // this.props.props.setBudgetState(data);
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        // console.log("Clicked!");
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