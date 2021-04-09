const d3 = require('d3');
const _ = require('lodash');
const fs = require('fs');
const { applyCategoryRules } = require("./categoryRules");
const dh = require('./dateHelper');

// const _dh = new dh.dateHelper(new Date());
const _dh = new dh.dateHelper(new Date('03-01-2021'));

const mm = _dh.getMonth();
const yy = _dh.getYearShort();

console.log(__dirname);

fs.readFile(`${__dirname}/input/mint/transactions_input_${mm}${yy}.csv`, "utf8", function (error, data) {
    if (error) { console.error(error) };
    data = d3.csvParse(data);


    //Remove Transfers and Credit Card Payments
    let dataNoTransfers = d3.filter(data, function (d) { return d.Category != "Transfer" && d.Category != "Credit Card Payment" });
    dataNoTransfers = d3.filter(dataNoTransfers, function (d) {return !d.Description.includes("ACH")});


    //Data Pre-Processing
    dataNoTransfers.forEach(element => {

        //Date Formatting
        element.Date = new Date(element.Date);

        //Remove Strings in Headers
        element.TransactionType = element['Transaction Type'];
        element.OriginalDescription = element['Original Description'];
        element.AccountName = element['Account Name'];
        delete element['Transaction Type'];
        delete element['Original Description'];
        delete element['Account Name'];

        //Amount Formatting
        element.Amount = +element.Amount;
        if(element.TransactionType == "debit") element.Amount = element.Amount * -1;

        //Add Budgeting Category
        element.BudgetCategory = applyCategoryRules(element);
    });

    const income = d3.filter(dataNoTransfers, function (d) { return d.TransactionType == 'credit' });
    const totalIncome = d3.sum(income, function (d) { return d.Amount });

    const spending = d3.filter(dataNoTransfers, function (d) { return d.TransactionType == 'debit' });
    let totalSpending = d3.sum(spending, function (d) { return d.Amount });

    console.log("Income: ", d3.format('.2f')(totalIncome));
    console.log("Outflow: ", d3.format('.2f')(totalSpending));
    console.log("Net: ", d3.format('.2f')(totalIncome + totalSpending));

    formattedOutput = d3.csvFormat(dataNoTransfers);
    fs.writeFile(`${__dirname}/output/transactions_output_${mm}${yy}.csv`, formattedOutput, function (error) {
        if (error) console.error("error writing file: ", error);
    })
    // console.log(dataNoTransfers);
})