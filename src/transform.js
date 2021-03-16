const d3 = require('d3');
const _ = require('lodash');
const fs = require('fs');
const {convertMonth} = require("./monthConverter");

// fs.readFile("./tranTest.json", function(error,data){
//     data = JSON.parse(data);
//     console.log(data);

//     // const amount = d3.map(data, function(d) {return d.amount})
//     // console.log(amount);
//     console.log(data[0].amount);
//     data[0].amount = data[0].amount.substring(1);
//     data[0].amount = +data[0].amount;
//     // data[0].amount += .01;
//     console.log(data);
// })
fs.readFile("./transactions_0121.json", function(error,data){
    data = JSON.parse(data);
    // console.log(data);

    //Data Pre-Processing
    data.forEach(element => {
        //Amount Formatting
        element.amount = element.amount.substring(1);
        element.amount = _.replace(element.amount,',','');
        element.amount = +element.amount;

        //Date Formatting
        element.date = new Date(2010, convertMonth(element.date.substring(0,3)), element.date.substring(4));
    })
    // console.log(data);

    const income = d3.filter(data, function(d) {return d.isDebit == false});
    console.log(income);

    // const maxTransaction = d3.max(data, function(d) {return d.id});
    // console.log(maxTransaction);
    // const maxAmount = d3.count(data, function(d) {return d.fi == "US Bank"});
    // console.log(maxAmount);
})