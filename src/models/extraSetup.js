const applyExtraSetup = sequelize => {
    const { budgetHeader, budgetItem, category, transaction, accrual } = sequelize.models;

    budgetHeader.hasMany(budgetItem);
    budgetItem.belongsTo(budgetHeader);

    category.hasMany(budgetItem, {
        allowNull: false
    });
    budgetItem.belongsTo(category);

    category.hasOne(accrual, {
        allowNull: true
    });
    accrual.belongsTo(category);

    category.hasMany(transaction)
    transaction.belongsTo(category);

    budgetHeader.hasMany(transaction, {
        allowNull: false
    });

    transaction.belongsTo(budgetHeader);


}

module.exports = {
    applyExtraSetup
}