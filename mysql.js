const { readFile } = require('./src/readFile');
const { transformDataMint } = require('./src/mintTransform');
const pool = require('./src/db');

COLUMNS = ['date', 'description', 'amount', 'category', 'label', 'notes', 'transaction_type', 'original_description', 'account', 'budget_category', 'source']
placeholders = '';

for (i = 0; i < COLUMNS.length; i++) {
  placeholders += "?,"
}
placeholders = placeholders.slice(0, placeholders.length - 1);


const transactionsDAO = async () => {
  let dataMint = await readFile(`${__dirname}/src/input/mint/transactions_input_0421.csv`);
  let transformedDataMint = transformDataMint(dataMint);

  let stmt = `INSERT INTO transactions(${COLUMNS}) VALUES (${placeholders})`;
  let dataArray = prepDataForInsert(transformedDataMint);


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

const prepDataForInsert = (transformedDataMint) => {
  let data = transformedDataMint.split('\n');
  data.shift();
  let dataArray = [];

  data.forEach(element => {
    items = element.split(",");
    dataArray.push(items);
  });
  return dataArray;
}


transactionsDAO();


