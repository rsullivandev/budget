import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';

const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifer for this budget category", flex: 1 },
    { field: "categoryName", headerName: "Category Name", description: "The name of the budget category", flex: 1 },
    { field: "description", headerName: "Description", description: "The description of the category", flex: 1 },
    { field: "budgetType", headerName: "Type", description: "Monthly budget or escrow", flex: 1 }
]

export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount = async () => {
        try {
            const data = await (await fetch('/api/categories')).json();
            this.setState({
                categories: data
            })

            //TODO - Sort by Type 

        } catch (e) {
            console.log(e);
        }
    }

    handleClick = async (event) => {
        console.log("Clicked!");
        // this.props.props.setSelectedBudget(event.id)
    }

    handleSubmit = async () => {
        console.log("submit!");
    }


    render() {
        const { categories } = this.state;
        return (
            <div style={{ height: 800, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <h2>Categories</h2>
                        <DataGrid columns={columns} rowHeight={25} rows={categories} onRowClick={this.handleClick} />
                        <Button style={{ marginLeft: '20px' }} variant="contained" color='primary' onClick={this.handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div >
        )
    }
}
