const { readFile } = require('./services/readFile');
const { setFile } = require('./services/setFile');
const { transformDataMint } = require('./services/mintTransform');
const { transformDataUSBank } = require('./services/usBankTransform');
const { executeUpload } = require('./services/fileUpload');
const { transactionsDAO } = require('services/transactionsDAO');
const dh = require('./services/dateHelper');


const orchestrateData = async (uploadIndicator = false, date = '04-01-2021') => {

    const _dh = new dh.dateHelper(new Date(date));
    const mm = _dh.getMonth();
    const yy = _dh.getYearShort();


    let dataMint = await readFile(`${__dirname}/input/mint/transactions_input_${mm}${yy}.csv`);
    let transformedDataMint = transformDataMint(dataMint);
    let dataUSBank = await readFile(`${__dirname}/input/usbank/transactions_input_${mm}${yy}.csv`);

    let transformedDataUSBank = transformDataUSBank(dataUSBank);

    transformedDataUSBank = transformedDataUSBank.substring(transformedDataUSBank.indexOf('\n') + 1); // remove header row since we're combining

    let combinedData = transformedDataMint + "\n" + transformedDataUSBank

    await transactionsDAO(combinedData);

    let fileName = `transactions_output_${mm}${yy}.csv`
    await setFile(`${__dirname}/output/${fileName}`, combinedData);

    if (uploadIndicator == "true") {
        console.log('hit');
        await executeUpload(combinedData, fileName);
    }

}

orchestrateData(process.env.UPLOAD, process.env.DATE);