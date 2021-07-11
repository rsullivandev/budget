const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize');
const validators = require('services/validators');


router.get('/', async (req, res) => {
    const transactions = await models.transaction.findAll({ include: [models.category, models.budgetHeader] });
    res.status(200).json(transactions);
})

router.get('/:id', async (req, res) => {
    const transaction = await models.transaction.findByPk(req.params.id, { include: [models.category, models.budgetHeader] });
    res.status(200).json(transaction);
})


router.post('/', async (req, res) => {

    const record = {
        date: req.body.date,
        budgetHeaderId: req.body.budgetHeaderId,
        budgetItemId: req.body.budgetItemId,
        description: req.body.description,
        amount: req.body.amount,
        categoryId: req.body.categoryId,
        label: req.body.label,
        notes: req.body.notes,
        transactionType: req.body.transaction_type,
        originalDescription: req.body.original_description,
        account: req.body.account,
        initialCategory: req.body.initialCategory,
        source: req.body.source,
    }

    if (validators.validateDate(date) == false) {
        res.status(400).json(`Error: Please submit date as yyyy-mm-dd.`)
        return
    }

    if (validators.validateBudgetHeaderId(budgetHeaderId) == false) {
        res.status(400).json(`Error: Please submit valid budget header ID`)
        return
    }

    if (validators.validateBudgetItemId(budgetItemId) == false) {
        res.status(400).json(`Error: Please submit valid budget header ID`)
        return
    }

    if (validators.validateDescription(description) == false) {
        res.status(400).json(`Error: Please submit valid description`)
        return
    }

    if (validators.validateAmount(amount) == false) {
        res.status(400).json(`Error: Please submit valid amount with two decimal places - e.g. 43.25`)
        return;
    }

    if (validators.validateCategoryId(categoryId) == false) {
        res.status(400).json(`Error: Please submit valid category Id`)
        return
    }

    if (validators.validateDescription(label) == false) {
        res.status(400).json(`Error: Please submit valid label`)
        return
    }

    if (validators.validateDescription(notes) == false) {
        res.status(400).json(`Error: Please submit valid note description`)
        return
    }

    if (validators.validateType(transactionType) == false) {
        res.status(400).json(`Error: Please submit valid transaction type: 'credit or 'debit'`)
        return
    }

    if (validators.validateDescription(originalDescription) == false) {
        res.status(400).json(`Error: Please submit valid note original description`)
        return
    }

    if (validators.validateDescription(originalDescription) == false) {
        res.status(400).json(`Error: Please submit valid note original description`)
        return
    }

    if (validators.validateDescription(initialCategory) == false) {
        res.status(400).json(`Error: Please submit valid initial cateogry`)
        return
    }

    if (validators.validateSource(source) == false) {
        res.status(400).json(`Error: Please submit valid transaction source - Mint or USBank`)
        return
    }

    record.amount = (Math.round(req.body.plannedAmount * 100) / 100).toFixed(2);

    try {
        const createdRecord = await models.category.create(record);
        res.status(201).json(`Transaction ${createdRecord.id} has been posted for the amount ${amount}`)
    } catch (e) {
        console.log(e);
        res.status(400).json(`An error occurred while posting transaction: ${e.name}`)
    }

})

module.exports = router;