const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('balance', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        accountType: {
            type: DataTypes.STRING
        },
        currentBalance: {
            type: DataTypes.DECIMAL(10, 2)
        }
    })
}