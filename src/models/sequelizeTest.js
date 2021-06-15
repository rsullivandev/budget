const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb'
});

const checkSequelize = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been successfully established');
        return true
    } catch (e) {
        console.log('Unable to connect to database', e);
        return false
    }

}

const closeSequelize = async () => {
    try {
        await sequelize.close();
        console.log('Connection has been closed');
        return true
    } catch (e) {
        console.log('Unable to close database connection...was it running?', e);
        return false
    }
}

const createTransactionModel = async () => {
    const SequelizeTransaction = sequelize.define('SequelizeTransaction', {
        id: {
            type: DataTypes.MEDIUMINT,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
        },
        description: {
            type: DataTypes.STRING,
        },
        amount: {
            type: DataTypes.DECIMAL(10,2)
        },
        category: {
            type: DataTypes.STRING
        }

    })

    console.log(SequelizeTransaction === sequelize.models.SequelizeTransaction);
    await SequelizeTransaction.sync({force: true})

    await seedTransactions();

}

const seedTransactions = async () => {
    SequelizeTransaction = sequelize.models.SequelizeTransaction;

    const phoneBill = SequelizeTransaction.build({date: '2021-06-12', description: 'phone bill', amount: 72.00, category: 'bills'});
    await phoneBill.save();

    const tvBill = SequelizeTransaction.build({date: '2021-06-11', description: 'tv bill', amount: 140.00, category: 'bills'});
    await tvBill.save();

    const autoInsuranceBill = SequelizeTransaction.build({date: '2021-06-06', description: 'insurance bill', amount: 60.00, category: 'bills'});
    await autoInsuranceBill.save();

}

createTransactionModel();

module.exports = {
    checkSequelize: checkSequelize,
    closeSequelize: closeSequelize
}