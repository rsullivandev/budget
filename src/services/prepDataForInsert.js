const prepDataForInsert = (transformedDataMint) => {
  let data = transformedDataMint.split('\n');
  data.shift();
  let dataArray = [];

  data.forEach(element => {
    items = element.split(",");
    dataArray.push(items);
  });
  return dataArray;
};
exports.prepDataForInsert = prepDataForInsert;
