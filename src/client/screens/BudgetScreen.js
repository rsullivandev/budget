import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'planned', headerName: 'Planned Amount', width: 150 },
    { field: 'actual', headerName: 'Actual Amount', width: 150 },
    { field: 'net', headerName: 'Net Amount', width: 150 },

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
            const newArray = data.map(item => {
                return {id: item.id, date: item.date, planned: "", actual: "", net: ""}
            })
            console.log(newArray);
            this.setState({
                budget: newArray
            })
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        const { budget } = this.state;
        const {rows} = this.state;
        console.log(budget);
        return (
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid columns={columns} rows= {budget}
                />
            </div >
        )
    }
}