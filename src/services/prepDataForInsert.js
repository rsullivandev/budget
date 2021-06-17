const prepDataForInsert = (transactionDataString) => {
  let data = transactionDataString.split('\n');
  data.shift();
  let dataArray = [];

  data.forEach(element => {
    items = element.split(",");
    transaction = {
      date: items[0],
      description: items[1],
      amount: items[2],
      category: items[3],
      label: items[4],
      notes: items[5],
      transaction_type: items[6],
      original_description: items[7],
      account: items[8],
      budget_category: items[9],
      source: items[10]
    }
    dataArray.push(transaction);
  });

  return dataArray;
};
exports.prepDataForInsert = prepDataForInsert;
