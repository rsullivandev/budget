const d3 = require('d3');
const _ = require('lodash');
const fs = require('fs');
const { applyCategoryRules } = require("./categoryRules");

fs.readFile("./transactions_0121.csv", "utf8", function (error, data) {
    if (error) { console.error(error) };
    data = d3.csvParse(data);

    //Remove Transfers and Credit Card Payments
    let dataNoTransfers = d3.filter(data, function (d) { return d.Category != "Transfer" && d.Category != "Credit Card Payment" });

    //Data Pre-Processing
    dataNoTransfers.forEach(element => {


        //Amount Formatting
        element.Amount = +element.Amount;

        //Date Formatting
        element.Date = new Date(element.Date);

        //Remove Strings in Headers
        element.TransactionType = element['Transaction Type'];
        element.OriginalDescription = element['Original Description'];
        element.AccountName = element['Account Name'];
        delete element['Transaction Type'];
        delete element['Original Description'];
        delete element['Account Name'];

        //Add Budgeting Category
        element.BudgetCategory = applyCategoryRules(element);
    });

    console.log(d3.filter(dataNoTransfers, function(d) {return d.BudgetCategory == "Unknown"}));

    const income = d3.filter(dataNoTransfers, function(d) {return d.TransactionType == 'credit'});
    const totalIncome = d3.sum(income, function(d) {return d.Amount});
    console.log("Income: ", d3.format('.2f')(totalIncome));

    const spending = d3.filter(dataNoTransfers, function(d) {return d.TransactionType == 'debit'});
    let totalSpending = d3.sum(spending, function(d) {return d.Amount});
    console.log("Outflow: ", d3.format('.2f')(totalSpending));

    console.log("Net: ", d3.format('.2f')(totalIncome - totalSpending));



})