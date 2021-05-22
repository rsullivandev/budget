const { readFile } = require('./readFile');
const { transformDataMint } = require('./mintTransform');
const pool = require('./db');
const { getColumns, getPlaceholders } = require('./models/transactions');

const transactionsDAO = async () => {
  let dataMint = await readFile(`${__dirname}/input/mint/transactions_input_0421.csv`);
  let transformedDataMint = transformDataMint(dataMint);

  let stmt = `INSERT INTO transactions(${getColumns()}) VALUES (${getPlaceholders()})`;
  let dataArray = prepDataForInsert(transformedDataMint);


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


