const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize')
const validators = require('services/validators')


router.get('/', async (req, res) => {
    const budgets = await models.budgetHeader.findAll({ include: [{ model: models.budgetItem, include: { model: models.category } }] });
    res.status(200).json(budgets);
})

router.get('/:id', async (req, res) => {
    const budgets = await models.budgetHeader.findByPk(req.params.id, { include: [{ model: models.budgetItem, include: { model: models.category } }] });
    res.status(200).json(budgets);
})

router.post('/', async (req, res) => {

    const date = req.body.date;

    if (validators.validateDate(date) == false) {
        res.status(400).json(`Error: Please submit date as yyyy-mm-dd.`)
        return
    }

    try {
        const record = await models.budgetHeader.create({ date: date })

        res.status(201).json(`Budget for ${record.date} has been created!`);
    } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            console.log(e)
            res.status(400).json(`A budget for ${date} already exists!`)
        } else {
            console.log(e)
            res.status(400).json(`An error occurred while creating budget: ${e.name}`)
        }
    }

})

module.exports = router;