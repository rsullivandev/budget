const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('budgetItem', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        plannedAmount: {
            type: DataTypes.DECIMAL(10, 2)
        }
    })
}