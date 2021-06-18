const sequelize = require('models/sequelize');

const reset = async () => {
    console.log('Will rewrite the mariadb database, adding some dummy date');

    await sequelize.sync({ force: true });

    await sequelize.models.transaction.bulkCreate([
        { date: '2021-06-12', description: 'phone bill', amount: 72.00, category: 'bills', label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 1', budget_category: 'mobile', source: 'mint' },
        { date: '2021-06-11', description: 'tv bill', amount: 140.00, category: 'bills', label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 2', budget_category: 'mobile', source: 'usbank' },
        { date: '2021-06-10', description: 'insurance bill', amount: 60.00, category: 'bills', label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 3', budget_category: 'insurance', source: 'mint' }
    ])

    await sequelize.models.budget.create(
        { date: "2021-04-01" }
    )

    await sequelize.models.budgetItem.bulkCreate([
        { item: "ShoppingBudget", plannedAmount: 600.00, actualAmount: 550.00, notes: "Bought some clothes!", budgetId: 1 },
        { item: "FoodBudget", plannedAmount: 800.00, actualAmount: 790.00, notes: "Eating out is expensive!", budgetId: 1 },
        { item: "KidBudget", plannedAmount: 200.00, actualAmount: 350.00, notes: "Got a little excited on the gifts", budgetId: 1 },
    ])


}

reset();