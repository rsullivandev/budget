const { Sequelize } = require('sequelize');

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

module.exports = {
    checkSequelize: checkSequelize,
    closeSequelize: closeSequelize
}