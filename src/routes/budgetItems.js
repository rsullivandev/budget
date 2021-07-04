const express = require('express');
const router = express.Router();
const sequelize = require('models/sequelize');
const validators = require('services/validators');

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


router.post('/', async (req, res) => {
    const categoryId = req.body.categoryId;
    const budgetHeaderId = req.body.budgetHeaderId;
    const plannedAmount = (Math.round(req.body.plannedAmount * 100) / 100).toFixed(2);


    if (validators.validateCategoryId(categoryId) == false) {
        res.status(400).json(`Error: Please submit valid category Id`)
        return
    }

    if (validators.validateBudgetHeaderId(budgetHeaderId) == false) {
        res.status(400).json(`Error: Please submit valid budget header ID`)
        return
    }

    if (validators.validatePlannedAmount(plannedAmount) == false) {
        res.status(400).json(`Error: Please submit valid amount with two decimal places - e.g. 43.25`)
        return;
    }

    try {
        const record = await sequelize.models.budgetItem.create({
            budgetHeaderId: budgetHeaderId,
            categoryId: categoryId,
            plannedAmount: plannedAmount
        })

        res.status(201).json(`Budget Item created and assigned to budget ${budgetHeaderId}`);
    } catch (e) {
        console.log(e)
        res.status(400).json(`An error occurred while creating budget: ${e.name}`)
    }
})

module.exports = router;