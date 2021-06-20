const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('budgetItem', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
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
        netAmount: {
            type: DataTypes.VIRTUAL,
            get () {
                return this.plannedAmount - this.actualAmount
            }
        },
        notes: {
            type: DataTypes.STRING
        }
    })
}