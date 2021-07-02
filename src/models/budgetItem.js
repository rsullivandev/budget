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
        // actualAmount: {
        //     type: DataTypes.VIRTUAL,
        //     async get() {
        //         const transactions = await sequelize.models.transaction.findAll({
        //             // attributes: [
        //             //     sequelize.fn('SUM', sequelize.col('amount')), 'sumAmount'
        //             // ],
        //             where: {
        //                 budgetHeaderId: this.getDataValue("budgetHeaderId"),
        //                 categoryId: this.getDataValue("categoryId")
        //                 // budgetHeaderId: 1,
        //                 // categoryId: 4
        //             }
        //         })

        //         let sum = 0;
        //         transactions.forEach(transaction => {
        //             sum += transaction.amount;
        //         })
        //         return sum
        //     }
        // }
    })
}