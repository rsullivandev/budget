const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

module.exports = {
    getConnection: async () => {
        try {
            return conn = await pool.getConnection();
        }
        catch (e) {
            console.error(e);
            return e
        }
    },

    endConnection: async () => {
        try {
            await pool.end()
        }
        catch (e) {
            console.error(e);
            return e
        }
    }
}