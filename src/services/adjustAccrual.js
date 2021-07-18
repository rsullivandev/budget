const { models } = require('models/sequelize');

const updateAccrual = async (amount) => {

    try {
        const record = await models.balance.findAll({
            where: {
                accountType: 'accrual'
            }
        })

        const currentAmount = record[0].currentBalance;

        const newAmount = currentAmount + amount;

        const savedRecord = await models.balance.update({ currentBalance: newAmount }, {
            where: {
                id: record[0].id
            }
        });
    } catch (e) {
        console.log("Error during accrual balance update: " + e.name)
        return false
    }
}

module.exports = updateAccrual;