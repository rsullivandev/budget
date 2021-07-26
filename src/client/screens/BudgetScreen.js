import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this budget", flex: .2},
    { field: 'date', headerName: 'Date', descrition: "The month this budget is effective for - set for a given month and year.", flex: .2,
        valueFormatter: (params) => { //TODO need to find a better way to store dates in UTC.
            const date = new Date(params.value);
            return `${("0" + (date.getUTCMonth() + 1)).slice(-2)}/${date.getUTCFullYear()}` //Adding 0 digit for single digit months
        }},
    { field: 'planned', headerName: 'Planned Amount', description: "The total amount planned to be spent for this budget", flex: .2,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                sum += item.plannedAmount;
            });
            return (Math.round(sum * 100) / 100).toFixed(2);
        }},
    { field: 'actual', headerName: 'Actual Amount', description: "The actual amount spent for this budget", flex: .2,
        valueGetter: (params) => {
            let sum = 0;
            params.row.budgetItems.forEach(item => {
                item.transactions.forEach(transaction => {
                    sum += transaction.amount;
                })
            });

            return (Math.round(sum * 100) / 100).toFixed(2);
        }},
    { field: 'net', headerName: 'Net Amount', description: "The net difference between planned and actual for this budget", flex: .2,
        valueGetter: (params) => {
            console.log(params);
            let sum = params.getValue(params.id, "planned") - params.getValue(params.id, "actual");
            return sum;
        }},

];

export default class BudgetScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: []
        }
    }


    componentDidMount = async () => {
        try {
            const data = await (await fetch('/api/budgetHeaders')).json();
            console.log(data);
            // const filteredArray = data.map(item => {
            //     return { id: item.id, date: item.date, planned: "", actual: "", net: "" }
            // })
            // console.log(filteredArray);
            this.setState({
                // budget: filteredArray
                budget: data
            })
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        const { budget } = this.state;
        return (
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid columns={columns} rows={budget}/>
                    </div>
                </div>
            </div >
        )
    }
}