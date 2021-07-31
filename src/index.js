import React from 'react';
import ReactDOM from 'react-dom';
import './client/css/index.css';
import BudgetScreen from './client/screens/BudgetScreen.js';
import TestRouter from './testRouter.js';
import TestRouter2 from './testRouter2.js';




ReactDOM.render(
    <React.StrictMode>
        <p>Welcome to Rob Mint</p>
        {/* <BudgetScreen/> */}
        {/* <TestRouter /> */}
        <TestRouter2 />

    </React.StrictMode>,
    document.getElementById('main')
)