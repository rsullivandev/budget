const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('budget', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            unique: "uniqueBudget"
        }
    })
}