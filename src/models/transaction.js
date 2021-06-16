const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('transaction', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
        },
        description: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        category: {
            type: DataTypes.STRING
        },
        label: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.STRING
        },
        transaction_type: {
            type: DataTypes.STRING
        },
        original_description: {
            type: DataTypes.STRING,
        },
        account: {
            type: DataTypes.STRING
        },
        budget_category: {
            type: DataTypes.STRING
        },
        source: {
            type: DataTypes.STRING
        }
    })
}