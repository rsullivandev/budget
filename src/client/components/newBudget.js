import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core'

export default class NewBudgetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            budgetItems: []
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
            const response = await (await fetch('/api/budgetHeaders', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date: this.state.date
                })
            })).json();

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker style={{ marginLeft: '20px' }} variant='inline' format='MM/dd/yyyy' id='date-picker-inline' label="Date"
                        value={this.state.date} onChange={this.handleChange} autoOk KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }} />
                </MuiPickersUtilsProvider>
                <Button style={{ marginLeft: '20px' }} variant="contained" color='primary' onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}