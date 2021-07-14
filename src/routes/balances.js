const express = require('express');
const router = express.Router();
const { models } = require('models/sequelize');
const validators = require('services/validators');

router.get('/', async (req, res) => {
    const balances = await models.balance.findAll();
    res.status(200).json(balances);
})

router.get('/:id', async (req, res) => {
    const balances = await models.balance.findByPk(req.params.id);
    res.status(200).json(balances);
})

router.post('/', async (req, res) => {
    const record = {
        accountType: req.body.accountType,
        currentBalance: req.body.currentBalance
    }

    //TODO - enumerator for balance types. Need to update validator as well.
    if (validators.validateBalanceType(record.accountType) == false) {
        res.status(400).json(`Error: Please submit valid balance type: cash, accrual or goal.`)
        return
    }

    if (validators.validateAmount(record.currentBalance) == false) {
        res.status(400).json(`Error: Please submit valid amount with two decimal places - e.g. 43.25`)
        return
    }

    record.currentBalance = (Math.round(record.currentBalance * 100) / 100).toFixed(2);

    try {
        const createdRecord = await models.balance.create(record);
        res.status(201).json(`${createdRecord.accountType} balance has been posted for the amount ${record.currentBalance}`)
    } catch (e) {
        console.log(e);
        res.status(400).json(`An error occurred while posting transaction: ${e.name}`)
    }

})

router.put('/:id', async (req, res) => {
    const record = {
        id: req.params.id,
        accountType: req.body.accountType,
        currentBalance: req.body.currentBalance
    }


    if (validators.validateBalanceType(record.accountType) == false) {
        res.status(400).json(`Error: Please submit valid balance type: cash, accrual or goal.`)
        return
    }

    if (validators.validateAmount(record.currentBalance) == false) {
        res.status(400).json(`Error: Please submit valid amount with two decimal places - e.g. 43.25`)
        return
    }

    record.currentBalance = (Math.round(record.currentBalance * 100) / 100).toFixed(2);

    try {
        const createdRecord = await models.balance.update(record, {
            where: {id: record.id}
        });
        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.status(400).json(`An error occurred while posting transaction: ${e.name}`)
    }

})


module.exports = router;