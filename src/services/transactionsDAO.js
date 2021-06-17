const { prepDataForInsert } = require("services/prepDataForInsert");

const sequelize = require('models/sequelize');

const transactionsDAO = async transactionString => {

  let dataArray = prepDataForInsert(transactionString);

  await sequelize.models.transaction.bulkCreate(dataArray, {updateOnDuplicate: ["id"]});


}

module.exports = {
  transactionsDAO: transactionsDAO
}

