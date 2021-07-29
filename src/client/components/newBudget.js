import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default class NewBudgetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            budgetItems: [],
            error: false,
            open: false,
            response: ""
        }
    }

    handleChange = (event) => {
        console.log(event)
        this.setState({
            date: event
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


    render() {
        let message;
        if (this.state.error == true) {
            message = <Alert severity="error" onClose={this.handleClose}>{this.state.response}</Alert>
        } else {
            message = <Alert severity="success" onClose={this.handleClose}>{this.state.response}</Alert>
        }
        return (
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker style={{ marginLeft: '20px' }} variant='inline' format='MM/dd/yyyy' id='date-picker-inline' label="Date"
                        value={this.state.date} onChange={this.handleChange} autoOk KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }} />
                </MuiPickersUtilsProvider>
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
        )
    }
}