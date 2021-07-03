const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize')
const Sequelize = require('sequelize')

router.get('/', async (req, res) => {
    const budgetItems = await models.budgetItem.findAll({
        attributes: [
            'id',
            'plannedAmount',
            [Sequelize.fn('SUM', Sequelize.col('transactions.amount')), 'actualAmount'],
            'budgetHeaderId',
            'categoryId'
        ],
        include: [
            {
                model: models.transaction,
                // attributes: []
            }
        ],
        group: ['id']
    });
    res.status(200).json(budgetItems);
})

router.get('/:id', async (req, res) => {
    const budgetItems = await models.budgetItem.findByPk(req.params.id, {
        attributes: [
            'id',
            'plannedAmount',
            [Sequelize.fn('SUM', Sequelize.col('transactions.amount')), 'actualAmount'],
            'budgetHeaderId',
            'categoryId'
        ],
        include: [
            {
                model: models.transaction,
                // attributes: []
            }
        ],
        group: ['id']
    });
    res.status(200).json(budgetItems);
})

module.exports = router;