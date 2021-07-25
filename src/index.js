import React from 'react';
import ReactDOM from 'react-dom';
import './client/css/index.css';
import BudgetScreen from './client/screens/BudgetScreen.js';




ReactDOM.render(
    <React.StrictMode>
        <p>Welcome to Rob Mint</p>
        <BudgetScreen/>

    </React.StrictMode>,
    document.getElementById('main')
)