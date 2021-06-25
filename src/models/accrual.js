const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('accrual', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        periodicity: {
            type: DataTypes.INTEGER
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10,2)
        },
        monthlyAmount: {
            type: DataTypes.VIRTUAL,
            get(){
                return Math.round(this.getDataValue("totalAmount") / this.getDataValue("periodicity"))
            }
        }

    })
}