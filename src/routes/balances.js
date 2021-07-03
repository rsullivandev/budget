const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize')

router.get('/', async (req, res) => {
    const balances = await models.balance.findAll();
    res.status(200).json(balances);
})

router.get('/:id', async (req, res) => {
    const balances = await models.balance.findByPk(req.params.id);
    res.status(200).json(balances);
})

module.exports = router;