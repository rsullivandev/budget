const sequelize = require('models/sequelize');


const prepDataForInsert = async (transactionDataString, budgetHeaderId) => {
  let data = transactionDataString.split('\n');
  data.shift();
  let dataArray = [];

  const categoryModels = await sequelize.models.category.findAll()

  let categories = [];

  categoryModels.forEach(categoryModel => {
    categories.push(categoryModel.dataValues);
  })

  const budgetItemModels = await sequelize.models.budgetItem.findAll({
    where: {
      budgetHeaderId: budgetHeaderId
    }
  })

  let budgetItems = [];

  budgetItemModels.forEach(budgetItemModel => {
    budgetItems.push(budgetItemModel.dataValues);
  })


  data.forEach(element => {
    items = element.split(",");

    console.log(element);
    let categoryId = categories.find(o => o.categoryName === items[9]);
    let budgetItemId = ''

    if (categoryId) {
      categoryId = categoryId.id;
      budgetItemId = budgetItems.find(o => o.categoryId === categoryId);
      if (budgetItemId) {
        budgetItemId = budgetItemId.id;
      } else {
        budgetItemId = null;
      }

    } else {
      categoryId = null;
      budgetItemId = null;
    }

    transaction = {
      date: items[0],
      description: items[1],
      amount: items[2],
      initialCategory: items[3],
      label: items[4],
      notes: items[5],
      transaction_type: items[6],
      original_description: items[7],
      account: items[8],
      budget_category: items[9],
      source: items[10],
      budgetHeaderId: budgetHeaderId,
      categoryId: categoryId,
      budgetItemId: budgetItemId,

    }
    dataArray.push(transaction);
  });

  return dataArray;
};
exports.prepDataForInsert = prepDataForInsert;
