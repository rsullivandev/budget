const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('budgetHeader', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            unique: true
        }
    })
}