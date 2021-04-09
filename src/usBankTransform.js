const d3 = require('d3');
const dh = require('./dateHelper');
const fs = require('fs');
const { applyUSBankCategoryRules } = require("./usBankCategoryRules");

// const _dh = new dh.dateHelper(new Date());
const _dh = new dh.dateHelper(new Date('03-01-2021'));

const mm = _dh.getMonth();
const yy = _dh.getYearShort();

fs.readFile(`${__dirname}/input/usbank/transactions_input_${mm}${yy}.csv`, "utf8", function (error, data) {
    if (error) { console.error(error) };
    data = d3.csvParse(data);

    //Date | Transaction Type | Name | Memo | Amount

    //Date | Description | Amount | Category | Labels | Notes | Transaction Type | Origincal Description | AccountName | Budget Category

    data = d3.filter(data, function (d) { return !d.Name.includes("CREDIT CRD") });
    data = d3.filter(data, function (d) { return !d.Name.includes("TARGET CARD SRVC") });
    data = d3.filter(data, function (d) { return !d.Name.includes("GreenState CU Ex") });

    // formattedData = [{
    //     "Date": "",
    //     "Description" : "",
    //     "Amount": "",
    //     "Category" : "",
    //     "Labels" : "",
    //     "Notes" : "",
    //     "Transaction Type": "",
    //     "Original Description": "",
    //     "AccountName": "",
    //     "BudgetCategory": ""
    // }]

    formattedData = [];
    temp = {};

    data.forEach(element => {
        temp.Date = new Date(element.Date);
        temp.Description = element.Name;
        temp.Amount = element.Amount;
        temp.Category = "";
        temp.Labels = ""
        temp.Notes = element.Memo;
        temp.TransactionType = element.Transaction;
        temp.OriginalDescription = "";
        temp.AccountName = "Ashley - US Bank"
        temp.BudgetCategory = applyUSBankCategoryRules(element);

        formattedData.push(temp);
        temp = {}; //unsure why the temp object needs to be reset
    })

    // console.log(formattedData);

    formattedOutput = d3.csvFormat(formattedData);

    fs.appendFile(`${__dirname}/output/transactions_output_${mm}${yy}.csv`, formattedOutput, function (error) {
        if (error) console.error("error writing file: ", error);
    })

});