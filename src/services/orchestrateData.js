const { readFile } = require('./readFile');
const { setFile } = require('./setFile');
const { transformDataMint } = require('./mintTransform');
const { transformDataUSBank } = require('./usBankTransform');
const { executeUpload } = require('./fileUpload');
const { transactionsDAO } = require('services/transactionsDAO');
const { budgetHeadersDAO } = require('services/budgetHeadersDAO');
const dh = require('./dateHelper');

const orchestrateData = async (uploadIndicator = "false", date = '04-01-2021') => {

    //TODO - make reading file inputs more dynamic - right now it expects 1 mint and 1 usbank file to exist.

    const _dh = new dh.dateHelper(new Date(date));
    const mm = _dh.getMonth();
    const yy = _dh.getYearShort();

    let dataMint = await readFile(`${__dirname}/../input/mint/transactions_input_${mm}${yy}.csv`);
    let transformedDataMint = transformDataMint(dataMint);
    let dataUSBank = await readFile(`${__dirname}/../input/usbank/transactions_input_${mm}${yy}.csv`);

    let transformedDataUSBank = transformDataUSBank(dataUSBank);

    transformedDataUSBank = transformedDataUSBank.substring(transformedDataUSBank.indexOf('\n') + 1); // remove header row since we're combining

    let combinedData = transformedDataMint + "\n" + transformedDataUSBank;

    const budgetHeaderId = await budgetHeadersDAO(date);
    await transactionsDAO(combinedData, budgetHeaderId);

    let fileName = `transactions_output_${mm}${yy}.csv`;
    await setFile(`${__dirname}/../output/${fileName}`, combinedData);

    if (uploadIndicator == "true") {
        console.log('hit');
        await executeUpload(combinedData, fileName);
    }

};
module.exports = {
    orchestrateData: orchestrateData
}
