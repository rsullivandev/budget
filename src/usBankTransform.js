const d3 = require('d3');
const { applyUSBankCategoryRules } = require("./usBankCategoryRules");

const transformDataUSBank = (data) => {
    
    data = d3.filter(data, function (d) { return !d.Name.includes("CREDIT CRD") });
    data = d3.filter(data, function (d) { return !d.Name.includes("TARGET CARD SRVC") });
    data = d3.filter(data, function (d) { return !d.Name.includes("GreenState CU Ex") });


    formattedData = [];
    temp = {};

    data.forEach(element => {
        temp.Date = new Date(element.Date);
        temp.Description = element.Name;
        temp.Amount = element.Amount;
        temp.Category = "";
        temp.Labels = ""
        temp.Notes = "";
        if (element.Amount.includes("-")) {
            temp.TransactionType = "DEBIT"
        } else {
            temp.TransactionType = "CREDIT"
        }
        temp.OriginalDescription = element.Memo;
        temp.AccountName = "Ashley - US Bank"
        temp.BudgetCategory = applyUSBankCategoryRules(element);


        formattedData.push(temp);
        temp = {}; //unsure why the temp object needs to be reset
    })


    formattedOutput = d3.csvFormat(formattedData);
    return formattedOutput;
}


module.exports = {
    transformDataUSBank: transformDataUSBank,
}