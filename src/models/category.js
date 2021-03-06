const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('category', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
        budgetType: {
            type: DataTypes.STRING
        }
    })
}