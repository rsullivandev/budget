const { readFile } = require('services/readFile');
const { transformDataMint } = require('services/mintTransform');
const { getColumns, getPlaceholders } = require('models/transactions');
const { prepDataForInsert } = require("services/prepDataForInsert");
const pool = require('config/db');

const transactionsDAO = async transactions => {

  let stmt = `INSERT INTO transactions(${getColumns()}) VALUES (${getPlaceholders()}) ON DUPLICATE KEY UPDATE id=id`;
  let dataArray = prepDataForInsert(transactions);

  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.batch(stmt, dataArray);
    console.log(res);
  } catch (err) {
    console.error("error during database connection: ", err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

module.exports = {
  transactionsDAO: transactionsDAO
}

