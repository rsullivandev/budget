// `const pool = require('config/db');
const mariadb = require('mariadb');

describe('database tests', () => {

    let conn;
    const pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        connectionLimit: 5
    });

    beforeAll(async () => {
        try {
            conn = await pool.getConnection();
        } catch (e) {
            console.error(e);
        }
    })

    afterAll(async () => {
        conn.end();
        pool.end();
    })

    test('database connection successful', async () => {

        let stmt = `SELECT 1 as val`;
        const res = await conn.query(stmt);

        expect(res[0].val).toBe(1);
    });

});

