const { readFile } = require('./services/readFile');
const { setFile } = require('./services/setFile');
const { transformDataMint } = require('./services/mintTransform');
const { transformDataUSBank } = require('./services/usBankTransform');
const { executeUpload } = require('./services/fileUpload');
const dh = require('./services/dateHelper');

const _dh = new dh.dateHelper(new Date('04-01-2021'));
const mm = _dh.getMonth();
const yy = _dh.getYearShort();


const orchestrateData = async () => {
    let dataMint = await readFile(`${__dirname}/input/mint/transactions_input_${mm}${yy}.csv`);
    let transformedDataMint = transformDataMint(dataMint);
    let dataUSBank = await readFile(`${__dirname}/input/usbank/transactions_input_${mm}${yy}.csv`);

    let transformedDataUSBank = transformDataUSBank(dataUSBank);

    transformedDataUSBank = transformedDataUSBank.substring(transformedDataUSBank.indexOf('\n')+1);

    //Need to find way to remove header row from usbank data.

    let combinedData = transformedDataMint + "\n" + transformedDataUSBank

    console.log(combinedData);

    let fileName = `transactions_output_${mm}${yy}.csv`
    await setFile(`${__dirname}/output/${fileName}`, combinedData);

    await executeUpload(combinedData, fileName);

}

orchestrateData();