import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withRouter } from "react-router-dom";
import { budgetDateFormatter, currencyFormatter } from '../services/formatter.js';

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this transaction", flex: .5 },
    {
        field: 'date', headerName: 'Transaction Date', description: "The date this transaction was executed", flex: .5,
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${date.getUTCDate()}/${date.getUTCFullYear()}` //Adding 0 digit for single digit months
        }
    },
    { field: 'description', headerName: 'Description', description: "The descriptiono of this transaction", flex: 1.5 },
    {
        field: 'amount', headerName: 'Amount', description: "The value of this transaction", flex: 1,
        valueFormatter: (params) => {
            return currencyFormatter(params.value)
        }
    }
];

class ItemDetailsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            date: "",
            totalAmount: "",
            category: ""
        }
    }

    componentDidMount = async () => {
        try {
            const { itemId } = this.props.match.params;
            const data = await (await fetch(`/api/budgetItems/${itemId}`)).json();

            let totalAmount = data[0].transactions.reduce((a, c) => {
                a += c.amount;
                return a;
            }, 0)

            this.setState({
                transactions: data[0].transactions,
                date: budgetDateFormatter(data[0].budgetHeader.date),
                category: data[0].category.categoryName,
                totalAmount: currencyFormatter(totalAmount)
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        // console.log("Clicked!");
        // console.log(event);
        // this.props.history.push(`/about`)
        // this.props.history.push(`/budgets/${event.id}`)
    }

    render() {
        const { transactions } = this.state;
        return (
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <h2>Item Details</h2>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <h3>Budget: {this.state.date}</h3>
                            <h3>Category: {this.state.category}</h3>
                            <h3>Total amount: {this.state.totalAmount}</h3>
                        </div>
                        <DataGrid columns={columns} rows={transactions} rowHeight={25} onRowClick={this.handleClick} />
                    </div>
                </div>
            </div >
        )
    }

}

export default withRouter(ItemDetailsScreen);