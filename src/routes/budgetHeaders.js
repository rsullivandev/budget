const express = require('express');
const router = express.Router();
const sequelize = require('models/sequelize')


router.get('/', async (req, res) => {
    const budgets = await models.budgetHeader.findAll({ include: [{ model: models.budgetItem, include: { model: models.category } }] });
    res.status(200).json(budgets);
})

router.get('/:id', async (req, res) => {
    const budgets = await models.budgetHeader.findByPk(req.params.id, { include: [{ model: models.budgetItem, include: { model: models.category } }] });
    res.status(200).json(budgets);
})

router.post('/', async (req, res) => {

    const budgetHeaderDate = req.body.date;

    if (/^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/.test(budgetHeaderDate) == false) {
        res.status(400).json(`Error: Please submit date as yyyy-mm-dd.`)
        return
    }

    try {
        const record = await sequelize.models.budgetHeader.create({ date: budgetHeaderDate })

        res.status(201).json(`Budget for ${record.date} has been created!`);
    } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(`A budget for ${budgetHeaderDate} already exists!`)
        } else {
            res.status(400).json(`An error occurred while creating budget: ${e.name}`)
        }
    }

})

module.exports = router;