import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DataGrid } from '@material-ui/data-grid';


//TODO extract this into a separate item, so I don't have to sync this to the Categories screen.
const columns = [
    { field: 'id', headerName: 'Id', description: "A unique identifer for this budget category", flex: 1 },
    { field: "categoryName", headerName: "Category Name", description: "The name of the budget category", flex: 1 },
    { field: "description", headerName: "Description", description: "The description of the category", flex: 1 },
    { field: "budgetType", headerName: "Type", description: "Monthly budget or escrow", flex: 1 }
]


export default class NewBudgetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            budgetItems: [],
            budgetOptions: [],
            selectedCopyBudget: "",
            categories: [],
            error: false,
            open: false,
            response: ""
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

        try {
            const data = await (await fetch('/api/budgetHeaders')).json();
            this.setState({
                budgetOptions: data
            })

            // this.props.props.setBudgetState(data);
        } catch (e) {
            console.log(e);
        }

    }

    handleChange = (event) => {
        console.log(event)
        this.setState({
            date: event
        });
    }

    handleSelectChange = (event) => {
        console.log(event)
        this.setState({
            selectedCopyBudget: event.target.value
        });
    }

    handleSubmit = async () => {

        try {
            const response = await fetch('/api/budgetHeaders', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: this.state.date
                })
            });

            const data = await response.json();

            if (response.status >= 399) {
                throw Error(data);
            } else {
                this.setState({
                    error: "",
                    response: data,
                    open: true
                })

                console.log(response);
            }
        } catch (e) {
            console.log(e.toString());
            this.setState({
                error: true,
                open: true,
                response: e.toString()
            })

        }
    }

    handleClose = (event, reason) => {
        this.setState({
            open: false
        })
    }

    handleClick = (e) => {
        console.log(e + " clicked!")
    }


    render() {
        let message;
        if (this.state.error == true) {
            message = <Alert severity="error" onClose={this.handleClose}>{this.state.response}</Alert>
        } else {
            message = <Alert severity="success" onClose={this.handleClose}>{this.state.response}</Alert>
        }
        return (
            <div style={{ height: 800, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker variant='inline' format='MM/yyyy' id='date-picker-inline' label="Budget Month"
                            value={this.state.date} onChange={this.handleChange} views={["year", "month"]} autoOk KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </MuiPickersUtilsProvider>
                    <FormControl style={{ display: 'flex', height: 'inherit', flexGrow: 1, justifyContent: 'flex-start' }}>
                        <InputLabel id='copyBudgetSelectorLabel'>Source Budget</InputLabel>
                        <Select labelId='copyBudgetSelectorLabel' id='copyBudgetSelector' value={this.state.selectedCopyBudget} onChange={this.handleSelectChange}>
                            <MenuItem value={'August'}>August</MenuItem>
                            <MenuItem value={'July'}>July</MenuItem>
                            <MenuItem value={'June'}>June</MenuItem>
                        </Select>
                        {/* <DataGrid columns={columns} rowHeight={25} rows={this.state.categories} checkboxSelection /> */}
                    </FormControl>
                    <Button style={{ marginLeft: '20px' }} variant="contained" color='primary' onClick={this.handleSubmit}>Submit</Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        {message}
                    </Snackbar>
                </div>
            </div>
        )
    }
}