const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize')

router.get('/', async (req, res) => {
    const categories = await models.category.findAll({ include: [models.accrual] });
    res.status(200).json(categories);
})

router.get('/:id', async (req, res) => {
    const categories = await models.category.findByPk(req.params.id, { include: [models.accrual] });
    res.status(200).json(categories);
})

module.exports = router;