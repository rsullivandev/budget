const pool = require('config/db');
const { Sequelize } = require('sequelize');
const { checkSequelize, closeSequelize } = require('models/sequelizeTest');

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

    test('Sequelize connected', async () => {
        try {
            let conn = await checkSequelize()
            await closeSequelize()
            expect(conn).toBe(true);
        } catch (e) {
            throw e
        }
    })


})
