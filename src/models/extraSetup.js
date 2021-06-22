const applyExtraSetup = sequelize => {
    const { budget, category, transaction } = sequelize.models;

    category.hasMany(budget, {
        allowNull: false
    });
    budget.belongsTo(category);

    category.hasMany(transaction)
    transaction.belongsTo(category);
}

module.exports = {
    applyExtraSetup
}