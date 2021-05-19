const mariadb = require('mariadb');
const pool = mariadb.createPool({
     user: process.env.DB_USER, 
     password: process.env.DB_PASS,
     database: process.env.DB_DATABASE,
     connectionLimit: 5
});
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO mytable (a) value ('G')", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
      console.error(err);
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

asyncFunction();