const { Sequelize } = require('sequelize');


const runSequelize = async () => {

    const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mariadb'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been successfully established');
    } catch (e) {
        console.log('Unable to connect to database', e);
    }

}

runSequelize();

module.exports = {
    runSequelize: runSequelize
}