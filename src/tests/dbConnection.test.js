const pool = require('config/db');
const { Sequelize } = require('sequelize');

describe('mariadb driver tests', () => {

    let conn;

    beforeAll(async () => {
        try {
            conn = await pool.getConnection();
        } catch (e) {
            console.error(e);
        }
    })

    afterAll(async () => {
        conn.end();
        pool.endConnection();
    })

    test('database connection successful', async () => {

        let stmt = `SELECT 1 as val`;
        const res = await conn.query(stmt);

        expect(res[0].val).toBe(1);
    });

});

describe('sequelize ORM tests', () => {

    const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mariadb'
    });

    afterAll(async () => {
        sequelize.close();
    })

    test('ORM connection successful', async () => {
        // let conn = await sequelize.authenticate();
        expect(sequelize.authenticate()).not.toThrow();
    })
})
