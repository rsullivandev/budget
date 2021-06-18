const applyExtraSetup = sequelize => {
    const { budget, budgetItem } = sequelize.models;

    budget.hasMany(budgetItem, {
        allowNull: false
    });
    budgetItem.belongsTo(budget);
}

module.exports = {
    applyExtraSetup
}