import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

export default class NewBudgetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "08/10/1986",
            budgetItems: []
        }
    }

    handleChange = (event) => {
        this.setState({
            date: event.target.value
        });
    }


    render() {
        const { date, budgetItems } = this.state;
        console.log(date);
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker variant='inline' format='MM/dd/yyyy' id='date-picker-inline' label="Date"
                    value={date} onChange={this.handlechange} KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }} />
            </MuiPickersUtilsProvider>
        )
    }
}