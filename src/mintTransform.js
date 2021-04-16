const d3 = require('d3');
const _ = require('lodash');
const fs = require('fs').promises;
const { applyCategoryRules } = require("./categoryRules");
const dh = require('./dateHelper');


// const _dh = new dh.dateHelper(new Date());
const _dh = new dh.dateHelper(new Date('03-01-2021'));

const mm = _dh.getMonth();
const yy = _dh.getYearShort();

console.log(__dirname);

const readFile = async inputFile => {
    try {
        let data = await fs.readFile(inputFile, 'utf8');
        data = d3.csvParse(data);
        return data;
    } catch (e) {
        console.error(e);
    }
}

const transformData = (data) => {
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

    return dataTransformed
}

const setFile = async (outputFileLocation, data) => {
    console.log(data)
    formattedOutput = d3.csvFormat(data);
    try {
        await fs.writeFile(outputFileLocation, formattedOutput);
    } catch (e) {
        console.error(e);
    }
}

const orchestrateMint = async () => {
    let data = await readFile(`${__dirname}/testInputMintData.csv`);
    data = transformData(data);
    await setFile(`${__dirname}/testOutputFormat2.csv`, data);
}

orchestrateMint();

module.exports = {
    readFile: readFile,
    transformData: transformData,
    setFile: setFile
}