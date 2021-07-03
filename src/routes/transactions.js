const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize')


router.get('/', async (req, res) => {
    const transactions = await models.transaction.findAll({ include: [models.category, models.budgetHeader] });
    res.status(200).json(transactions);
})

router.get('/:id', async (req, res) => {
    const transaction = await models.transaction.findByPk(req.params.id, { include: [models.category, models.budgetHeader] });
    res.status(200).json(transaction);
})

module.exports = router;