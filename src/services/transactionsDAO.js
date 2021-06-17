const { prepDataForInsert } = require("services/prepDataForInsert");

const sequelize = require('models/sequelize');

const transactionsDAO = async transactionString => {

  let dataArray = prepDataForInsert(transactionString);

  await sequelize.models.transaction.bulkCreate(dataArray, { updateOnDuplicate: ["category", "label", "notes", "transaction_type", "original_description", "account", "budget_category", "source"] });


}

module.exports = {
  transactionsDAO: transactionsDAO
}

