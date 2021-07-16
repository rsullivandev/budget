const EventEmitter = require('events');
const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize');
const validators = require('services/validators');

const myEmitter = new EventEmitter();


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
        transactionType: req.body.transactionType,
        originalDescription: req.body.originalDescription,
        account: req.body.account,
        initialCategory: req.body.initialCategory,
        source: req.body.source,
    }

    if (validators.validateDate(record.date) == false) {
        res.status(400).json(`Error: Please submit date as yyyy-mm-dd.`)
        return
    }

    if (validators.validateBudgetHeaderId(record.budgetHeaderId) == false) {
        res.status(400).json(`Error: Please submit valid budget header ID`)
        return
    }

    if (validators.validateBudgetItemId(record.budgetItemId) == false) {
        res.status(400).json(`Error: Please submit valid budget header ID`)
        return
    }

    if (validators.validateDescription(record.description) == false) {
        res.status(400).json(`Error: Please submit valid description`)
        return
    }

    if (validators.validateAmount(record.amount) == false) {
        res.status(400).json(`Error: Please submit valid amount with two decimal places - e.g. 43.25`)
        return;
    }

    if (validators.validateCategoryId(record.categoryId) == false) {
        res.status(400).json(`Error: Please submit valid category Id`)
        return
    }

    if (validators.validateDescription(record.label) == false) {
        res.status(400).json(`Error: Please submit valid label`)
        return
    }

    if (validators.validateDescription(record.notes) == false) {
        res.status(400).json(`Error: Please submit valid note description`)
        return
    }

    if (validators.validateType(record.transactionType) == false) {
        res.status(400).json(`Error: Please submit valid transaction type: 'credit or 'debit'`)
        return
    }

    if (validators.validateDescription(record.originalDescription) == false) {
        res.status(400).json(`Error: Please submit valid note original description`)
        return
    }

    if (validators.validateDescription(record.account) == false) {
        res.status(400).json(`Error: Please submit valid account name`)
        return
    }

    if (validators.validateDescription(record.initialCategory) == false) {
        res.status(400).json(`Error: Please submit valid initial cateogry`)
        return
    }

    if (validators.validateSource(record.source) == false) {
        res.status(400).json(`Error: Please submit valid transaction source - Mint or USBank`)
        return
    }

    record.amount = (Math.round(record.amount * 100) / 100).toFixed(2);

    try {
        const createdRecord = await models.transaction.create(record);
        // res.status(201).json(`Transaction ${createdRecord.id} has been posted for the amount ${record.amount}`)
        myEmitter.emit('transaction', record.amount)
    } catch (e) {
        console.log(e);
        res.status(400).json(`An error occurred while posting transaction: ${e.name}`)
    }

})

module.exports = router;