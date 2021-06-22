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
            unique: "uniqueTransaction"
        },
        description: {
            type: DataTypes.STRING,
            unique: "uniqueTransaction"
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            unique: "uniqueTransaction"
        },
        initialCategory: {
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
        source: {
            type: DataTypes.STRING
        }
    })
}