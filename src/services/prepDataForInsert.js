const prepDataForInsert = (transformedDataMint) => {
  let data = transformedDataMint.split('\n');
  data.shift();
  let dataArray = [];

  data.forEach(element => {
    items = element.split(",");
    // console.log(items[0]); //items holds an array of each element in a given line. Find a way to map this into the transaction object so that sequelize can uplaoad
    dataArray.push(items);
  });

  return dataArray;
};
exports.prepDataForInsert = prepDataForInsert;
