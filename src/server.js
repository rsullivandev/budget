const express = require('express');
const fs = require('fs');
const { createWriteStream } = require('fs');
const app = express();
const port = process.env.PORT || 3005;
const dh = require('services/dateHelper')
const { orchestrateData } = require('services/orchestrateData');
const multer = require('multer');
const { models } = require('models/sequelize')

// const start = async () => {

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/input/${req.body.source.toLowerCase()}`);
    },
    filename: function (req, file, cb) {
        const _dh = new dh.dateHelper(new Date(`${req.body.month} 1 ${req.body.year}`))
        cb(null, `transactions_input_${_dh.getMonth()}${_dh.getYearShort()}.csv`);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.originalname.includes('.csv')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});
app.get('/health', (req, res) => {
    res.status(200).send(`Server up and running`);
});

app.get('/api/transactions', async (req, res) => {
    const transactions = await models.transaction.findAll({include: [models.category, models.budgetHeader]});
    res.status(200).json(transactions);
})

app.get('/api/transactions/:id', async (req, res) => {
    const transaction = await models.transaction.findByPk(req.params.id, {include: [models.category, models.budgetHeader]});
    res.status(200).json(transaction);
})
app.get('/api/categories', async (req, res) => {
    const categories = await models.category.findAll({include: [models.accrual]});
    res.status(200).json(categories);
})

app.get('/api/categories/:id', async (req, res) => {
    const categories = await models.category.findByPk(req.params.id, {include: [models.accrual]});
    res.status(200).json(categories);
})
app.get('/api/budgets', async (req, res) => {
    const budgets = await models.budgetHeader.findAll({include: [{model: models.budgetItem, include: {model: models.category}}]});
    res.status(200).json(budgets);
})

app.get('/api/budgets/:id', async (req, res) => {
    const budgets = await models.budgetHeader.findByPk(req.params.id, {include: [{model: models.budgetItem, include: {model: models.category}}]});
    res.status(200).json(budgets);
})



app.get('/files', (req, res) => {
    res.sendFile(`${__dirname}/views/files.html`);
})

app.get('/files/new', (req, res) => {
    res.sendFile(`${__dirname}/views/filesUpload.html`);
})

app.post('/files/new', upload.single('filename'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send('Error: Please select a csv file for upload.');
    } else {
        const data = req.body.source;
        res.status(200).send(`file sourced from ${data} uploaded successfully`);
    }
});

app.get('/transactions', (req, res) => {
    res.sendFile(`${__dirname}/views/transactions.html`);
})

app.get('/transformedTransactions/new', (req, res) => {
    res.sendFile(`${__dirname}/views/transformedTransactions.html`);
})

app.post('/transformedTransactions/new', (req, res) => {
    const _dh = new dh.dateHelper(new Date(`${req.body.month} 1 ${req.body.year}`))

    //add in error handling

    orchestrateData("false", `${_dh.getMonth()}-01-${_dh.getYearFull()}`);

    res.status(200).send(`transactions categorized`)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// }

// start();