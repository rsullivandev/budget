const pool = require('config/db');

describe('database tests', () => {

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

