const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mariadb'
});

const modelDefiners = [
    require('./sequelizeTransactions')
]


modelDefiners.forEach(modelDefiner => {
    modelDefiner(sequelize);
})

//applyExtraSetup(sequelize)

module.exports = sequelize;