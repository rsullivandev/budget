import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color:'white',
        textDecoration: 'none'
    },
    active: {
        color:'white',
        textDecoration: 'underline'
    }
}));


export default () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant='h6' className={classes.title}>
                        <NavLink to='/budgets' className={classes.link} activeClassName={classes.active}>Budgets</NavLink>
                    </Typography>
                    <Typography variant='h6' className={classes.title}>
                        <NavLink to='/transactions' className={classes.link} activeClassName={classes.active}>Transactions</NavLink>
                    </Typography>
                    <Typography variant='h6' className={classes.title}>
                        <NavLink to='/goals' className={classes.link} activeClassName={classes.active}>Goals</NavLink>
                    </Typography>
                    <Typography variant='h6' className={classes.title}>
                        <NavLink to='/escrow' className={classes.link} activeClassName={classes.active}>Escrow</NavLink>
                    </Typography>
                    <Typography variant='h6' className={classes.title}>
                        <NavLink to='/categories' className={classes.link} activeClassName={classes.active}>Categories</NavLink>
                    </Typography>
                    <Typography variant='h6'>
                        <NavLink to='/budgets' className={classes.link}>Rob Mint</NavLink>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
