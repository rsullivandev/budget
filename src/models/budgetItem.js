const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('budgetItem', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            unique: "uniqueBudget"
        },
        item: {
            type: DataTypes.STRING,
            unique: "uniqueBudget"
        },
        plannedAmount: {
            type: DataTypes.DECIMAL(10,2)
        },
        actualAmount: {
            type: DataTypes.DECIMAL(10,2)
        },
        notes: {
            type: DataTypes.STRING
        }
    })
}