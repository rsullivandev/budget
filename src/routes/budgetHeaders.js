const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize')


router.get('/', async (req, res) => {
    const budgets = await models.budgetHeader.findAll({ include: [{ model: models.budgetItem, include: { model: models.category } }] });
    res.status(200).json(budgets);
})

router.get('/:id', async (req, res) => {
    const budgets = await models.budgetHeader.findByPk(req.params.id, { include: [{ model: models.budgetItem, include: { model: models.category } }] });
    res.status(200).json(budgets);
})

module.exports = router;