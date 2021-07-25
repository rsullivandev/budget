import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifier for this budget", flex: .2},
    { field: 'date', headerName: 'Date', descrition: "The month this budget is effective for - set for a given month and year.", flex: .2,
        valueFormatter: (params) => {
            const date = new Date(params.value);
            return `${date.getUTCMonth()+1}/${date.getUTCFullYear()}`
        }},
    { field: 'planned', headerName: 'Planned Amount', description: "The total amount planned to be spent for this budget", flex: .2},
    { field: 'actual', headerName: 'Actual Amount', description: "The actual amount spent for this budget", flex: .2},
    { field: 'net', headerName: 'Net Amount', description: "The net difference between planned and actual for this budget", flex: .2},

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
            const filteredArray = data.map(item => {
                return { id: item.id, date: item.date, planned: "", actual: "", net: "" }
            })
            console.log(filteredArray);
            this.setState({
                budget: filteredArray
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