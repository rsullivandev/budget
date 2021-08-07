const sequelize = require('models/sequelize');

const budgetHeadersDAO = async (date) => {

    try {
        const budgetDate = new Date(date);

        const budgetHeader = await sequelize.models.budgetHeader.findAll({
            where: {
                date: budgetDate
            }
        })

        if (budgetHeader.length > 0) {
            console.log("Budget Header found! " + budgetHeader[0].id)
            return budgetHeader[0].id;
        } else {

            const newRecord = await sequelize.models.budgetHeader.create({
                date: budgetDate
            })

            console.log("New Budget Header created! " + newRecord.id)
            return newRecord.id;
        }

    } catch (e) {
        console.log("Error: " + e);
        return null;
    }

}

module.exports = {
    budgetHeadersDAO: budgetHeadersDAO
}