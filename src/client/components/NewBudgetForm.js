import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';




// Add Columns

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContnet: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },

        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
    select: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexGrow: 1,
        height: 'inherit'
    }
}));


const NewBudgetForm = () => {
    const classes = useStyles();

    //create state for each input
    const [newBudgetMonth, setNewBudgetMonth] = useState('');
    const [copyMonth, setCopyMonth] = useState('');
    const [monthOptions, setMonthOptions] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e)

    }
    const handleClose = e => {
        console.log("Close!" + e)
    }


    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField label="First Name" variant="filled" required value={firstName} onChange={e => setFirstName(e.target.value)} />
            <FormControl className={classes.select}>
                <InputLabel id='copyBudgetSelectorLabel'>Source Budget</InputLabel>
                <Select labelId='copyBudgetSelectorLabel' value={copyMonth} onChange={e => setCopyMonth(e.target.value)}>
                    <MenuItem value={'August'}>August</MenuItem>
                    <MenuItem value={'July'}>July</MenuItem>
                    <MenuItem value={'June'}>June</MenuItem>
                </Select>
            </FormControl>
            <TextField label="Last Name" variant="filled" required value={lastName} onChange={e => setLastName(e.target.value)} />
            <TextField label="Email" variant="filled" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            <TextField label="Password" variant="filled" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Sign Up
                </Button>
            </div>
        </form>
    )

}
export default NewBudgetForm