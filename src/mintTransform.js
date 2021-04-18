const d3 = require('d3');
const { applyCategoryRules } = require("./categoryRules");


const transformDataMint = (data) => {
    //Remove Transfers and Credit Card Payments
    let dataTransformed = d3.filter(data, function (d) { return d.Category != "Transfer" && d.Category != "Credit Card Payment" });
    dataTransformed = d3.filter(dataTransformed, function (d) { return !d.Description.includes("ACH") });    

    //Data Pre-Processing
    dataTransformed.forEach(element => {

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
        if (element.TransactionType == "debit") element.Amount = element.Amount * -1;

        //Add Budgeting Category
        element.BudgetCategory = applyCategoryRules(element);
    });

    const income = d3.filter(dataTransformed, function (d) { return d.TransactionType == 'credit' });
    const totalIncome = d3.sum(income, function (d) { return d.Amount });

    const spending = d3.filter(dataTransformed, function (d) { return d.TransactionType == 'debit' });
    let totalSpending = d3.sum(spending, function (d) { return d.Amount });

    console.log("Income: ", d3.format('.2f')(totalIncome));
    console.log("Outflow: ", d3.format('.2f')(totalSpending));
    console.log("Net: ", d3.format('.2f')(totalIncome + totalSpending));

    formattedOutput = d3.csvFormat(dataTransformed);
    return formattedOutput;
}


module.exports = {
    transformDataMint: transformDataMint,
}