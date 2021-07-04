const express = require('express');
const router = express.Router();
const sequelize = require('models/sequelize');
const validators = require('services/validators');

router.get('/', async (req, res) => {
    const categories = await models.category.findAll({ include: [models.accrual] });
    res.status(200).json(categories);
})

router.get('/:id', async (req, res) => {
    const categories = await models.category.findByPk(req.params.id, { include: [models.accrual] });
    res.status(200).json(categories);
})

router.post('/', async (req, res) => {
    const categoryName = req.body.categoryName;
    const description = req.body.description;
    const budgetType = req.body.budgetType;

    if (validators.validateCategoryName(categoryName) == false) {
        res.status(400).json(`Error: Please submit valid category name: no spaces`)
        return
    }
    if (validators.validateDescription(description) == false) {
        res.status(400).json(`Error: Please submit valid description`)
        return
    }
    if (validators.validateBudgetType(budgetType) == false) {
        res.status(400).json(`Error: Please submit valid type: 'credit or 'debit'`)
        return
    }

    try {
        const record = await sequelize.models.category.create({
            categoryName: categoryName,
            description: description,
            budgetType: budgetType
        })

        res.status(201).json(`Category ${categoryName} was created with budget type ${budgetType}`)
    } catch (e) {
        console.log(e)
        res.status(400).json(`An error occurred while creating budget: ${e.name}`)
    }
})

module.exports = router;