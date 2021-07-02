const sequelize = require('models/sequelize');

const reset = async () => {
    console.log('Will rewrite the mariadb database, adding some dummy date');

    await sequelize.sync({ force: true });

    await sequelize.models.category.bulkCreate([
        //Monthly
        { categoryName: "Mortgage", description: "Mortgage payment", budgetType: "monthly" },
        { categoryName: "ChildCare", description: "Day care tuition", budgetType: "monthly" },
        { categoryName: "Television", description: "Television cable subscription", budgetType: "monthly" },
        { categoryName: "Energy", description: "Utlity bill - Energy", budgetType: "monthly" },
        { categoryName: "HouseCleaning", description: "House cleaners", budgetType: "monthly" },
        { categoryName: "Phone", description: "Mobile phone subscription", budgetType: "monthly" },
        { categoryName: "RobsAutoInsurance", description: "Rob's Auto Insurance Bill", budgetType: "monthly" },
        { categoryName: "Internet", description: "Utility bill - Internet", budgetType: "monthly" },
        { categoryName: "Gym", description: "Gym bill", budgetType: "monthly" },
        { categoryName: "Water", description: "Utility bill - Water", budgetType: "monthly" },
        { categoryName: "Netflix", description: "Netflix monthly bill", budgetType: "monthly" },
        { categoryName: "Spotify", description: "Spotify monthly bill", budgetType: "monthly" },
        { categoryName: "ShoppingBudget", description: "Monthly budget for shopping", budgetType: "monthly" },
        { categoryName: "FoodBudget", description: "Monthly budget for food", budgetType: "monthly" },
        { categoryName: "KidBudget", description: "Monthly budget for kids", budgetType: "monthly" },
        { categoryName: "Accrual", description: "Monthly transfer to accrual", budgetType: "monthly" },
        { categoryName: "Miscellaneous", description: "Monthly buffer budget", budgetType: "monthly" },
        { categoryName: "Income", description: "Monthly income - paychecks, bonuses, etc", budgetType: "monthly" },
        //Periodic
        { categoryName: "TrashSewer", description: "Utility bill - Trash", budgetType: "accrual" },
        { categoryName: "AshleyAutoInsurance", description: "Ashley's Auto Insurance bill", budgetType: "accrual" },
        { categoryName: "AshleyHair", description: "Ashley's hair appointment", budgetType: "accrual" },
        { categoryName: "AshleyCarRegistration", description: "Ashley's car registration", budgetType: "accrual" },
        { categoryName: "RobCarRegistration", description: "Rob's car registration", budgetType: "accrual" },
        { categoryName: "JacquesWellnessCheck", description: "Jacques' wellness check up", budgetType: "accrual" },
        { categoryName: "JacquesGrooming", description: "Jacques' grooming appointment", budgetType: "accrual" },
        { categoryName: "RobCarService", description: "Rob's car service", budgetType: "accrual" },
        { categoryName: "JacquesPreventativeMedicine", description: "Jacques' preventative medicine", budgetType: "accrual" },
        { categoryName: "AmazonPrime", description: "Amazon Prime Membership", budgetType: "accrual" },
        { categoryName: "RingInsurance", description: "Ring insurance", budgetType: "accrual" },
        { categoryName: "AppleDeveloper", description: "Apple Developer account", budgetType: "accrual" },
        { categoryName: "AshleyIRA", description: "Contribution to Ashley's IRA", budgetType: "accrual" },
        { categoryName: "Xbox", description: "Xbox Live", budgetType: "accrual" },
    ])

    await sequelize.models.accrual.bulkCreate([
        { categoryId: 19, periodicity: 3, totalAmount: 150 },
        { categoryId: 20, periodicity: 6, totalAmount: 300 },
        { categoryId: 21, periodicity: 2, totalAmount: 95 },
        { categoryId: 22, periodicity: 12, totalAmount: 406 },
        { categoryId: 23, periodicity: 12, totalAmount: 336 },
        { categoryId: 24, periodicity: 12, totalAmount: 332 },
        { categoryId: 25, periodicity: 2, totalAmount: 53 },
        { categoryId: 26, periodicity: 11, totalAmount: 280 },
        { categoryId: 27, periodicity: 12, totalAmount: 277 },
        { categoryId: 28, periodicity: 12, totalAmount: 119 },
        { categoryId: 29, periodicity: 12, totalAmount: 116 },
        { categoryId: 30, periodicity: 12, totalAmount: 106 },
        { categoryId: 31, periodicity: 12, totalAmount: 6000 },
        { categoryId: 32, periodicity: 12, totalAmount: 64 },
    ])

    await sequelize.models.budgetHeader.bulkCreate([
        { date: "2021-04-01" }
    ])

    const accruals = await sequelize.models.accrual.findAll({});
    let accrualBudget = 0;
    accruals.forEach(accrual => {
        accrualBudget += accrual.monthlyAmount;
    });


    await sequelize.models.budgetItem.bulkCreate([
        { budgetHeaderId: 1, categoryId: 1, plannedAmount: 800.00 },
        { budgetHeaderId: 1, categoryId: 2, plannedAmount: 700.00 },
        { budgetHeaderId: 1, categoryId: 3, plannedAmount: 44.00 },
        { budgetHeaderId: 1, categoryId: 4, plannedAmount: 73.00 },
        { budgetHeaderId: 1, categoryId: 5, plannedAmount: 142.00 },
        { budgetHeaderId: 1, categoryId: 6, plannedAmount: 125.00 },
        { budgetHeaderId: 1, categoryId: 7, plannedAmount: 200.00 },
        { budgetHeaderId: 1, categoryId: 8, plannedAmount: 150.00 },
        { budgetHeaderId: 1, categoryId: 9, plannedAmount: 75.00 },
        { budgetHeaderId: 1, categoryId: 10, plannedAmount: 80.00 },
        { budgetHeaderId: 1, categoryId: 11, plannedAmount: 125.00 },
        { budgetHeaderId: 1, categoryId: 12, plannedAmount: 350.00 },
        { budgetHeaderId: 1, categoryId: 13, plannedAmount: 93.00 },
        { budgetHeaderId: 1, categoryId: 14, plannedAmount: 80.00 },
        { budgetHeaderId: 1, categoryId: 15, plannedAmount: 73.00 },
        { budgetHeaderId: 1, categoryId: 16, plannedAmount: accrualBudget }, //accrual
    ])

    const budgetItems = await sequelize.models.budgetItem.findAll({});
    let sum = 0;
    budgetItems.forEach(budgetItem => {
        sum += budgetItem.plannedAmount
    })
    const miscBudget = sum * .1

    await sequelize.models.budgetItem.bulkCreate([
        {budgetHeaderId: 1, categoryId: 17, plannedAmount: miscBudget},
        {budgetHeaderId: 1, categoryId: 18, plannedAmount: 5000}, //income
    ])

    await sequelize.models.transaction.bulkCreate([
        { date: '2021-06-12', budgetHeaderId: 1, budgetItemId: 4, description: 'phone bill', amount: 72.00, categoryId: 4, label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 1', initialCategory: 'mobile', source: 'mint' },
        { date: '2021-06-11', budgetHeaderId: 1, budgetItemId: 5, description: 'tv bill', amount: 140.00, categoryId: 5, label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 2', initialCategory: 'mobile', source: 'usbank' },
        { date: '2021-06-10', budgetHeaderId: 1, budgetItemId: 6, description: 'insurance bill', amount: 60.00, categoryId: 6, label: '', notes: '', transaction_type: 'debit', original_description: '', account: 'account 3', initialCategory: 'insurance', source: 'mint' }
    ])

    await sequelize.models.balance.bulkCreate([
        { accountType: 'Accrual Escrow', currentBalance: 200.00},
        { accountType: 'Cash', currentBalance: 1000.00},
        { accountType: 'Water Heater', currentBalance: 170.00}
    ])
}

reset();