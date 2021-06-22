const sequelize = require('models/sequelize');

const reset = async () => {
    console.log('Will rewrite the mariadb database, adding some dummy date');

    await sequelize.sync({ force: true });

    await sequelize.models.category.bulkCreate([
        { categoryName: "ShoppingBudget", description: "Random stuff on Amazon that isn't food" },
        { categoryName: "FoodBudget", description: "Groceries and Restaurants" },
        { categoryName: "KidBudget", description: "Stuff for the kids" },
        { categoryName: "Phone", description: "Mobile phone subscription" },
        { categoryName: "Television", description: "Television cable subscription" },
        { categoryName: "HouseCleaning", description: "House cleaners" },
    ])

    await sequelize.models.budget.bulkCreate([
        { date: "2021-04-01", categoryId: 1, plannedAmount: 800.00 },
        { date: "2021-04-01", categoryId: 2, plannedAmount: 700.00 },
        { date: "2021-04-01", categoryId: 3, plannedAmount: 44.00 },
        { date: "2021-04-01", categoryId: 4, plannedAmount: 73.00 },
        { date: "2021-04-01", categoryId: 5, plannedAmount: 142.00 },
        { date: "2021-04-01", categoryId: 6, plannedAmount: 125.00 }
    ])

    await sequelize.models.transaction.bulkCreate([
        { date: '2021-06-12', description: 'phone bill', amount: 72.00, categoryId: 4, label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 1', initialCategory: 'mobile', source: 'mint' },
        { date: '2021-06-11', description: 'tv bill', amount: 140.00, categoryId: 5, label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 2', initialCategory: 'mobile', source: 'usbank' },
        { date: '2021-06-10', description: 'insurance bill', amount: 60.00, categoryId: 6, label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 3', initialCategory: 'insurance', source: 'mint' }
    ])

}

reset();