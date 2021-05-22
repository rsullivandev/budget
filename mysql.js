const mariadb = require('mariadb');
const { readFile } = require('./src/readFile');
const { transformDataMint } = require('./src/mintTransform');
const { setFile } = require('./src/setFile');

COLUMNS = ['date', 'description', 'amount', 'category', 'label', 'notes', 'transaction_type', 'original_description', 'account', 'budget_category']



const pool = mariadb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  connectionLimit: 5
});
async function asyncFunction() {
  let dataMint = await readFile(`${__dirname}/src/input/mint/transactions_input_0421.csv`);
  let transformedDataMint = transformDataMint(dataMint);

  let data = transformedDataMint.split('\n');
  data.shift();
  let dataArray = [];

  data.forEach(element => {
    items = element.split(",")
    dataArray.push(items);
  })


  let stmt = `INSERT INTO transactions(date, description, amount, category, label, notes, transaction_type, original_description, account, budget_category, source) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;


  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.batch(stmt, dataArray);
    console.log(res);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}


asyncFunction();

