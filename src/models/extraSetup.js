const applyExtraSetup = sequelize => {
    const { budget, category } = sequelize.models;

    category.hasMany(budget, {
        allowNull: false
    });
    budget.belongsTo(category);
}

module.exports = {
    applyExtraSetup
}