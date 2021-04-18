const {readFile} = require('./readFile');
const {setFile} = require('./setFile');
const {transformDataMint} = require('./mintTransform');
const {transformDataUSBank} = require('./usBankTransform');
const dh = require('./dateHelper');

const _dh = new dh.dateHelper(new Date('03-01-2021'));
const mm = _dh.getMonth();
const yy = _dh.getYearShort();


const orchestrateData = async () => {
    let dataMint = await readFile(`${__dirname}/input/mint/transactions_input_${mm}${yy}.csv`);
    let transformedDataMint = transformDataMint(dataMint);
    let dataUSBank = await readFile(`${__dirname}/input/usbank/transactions_input_${mm}${yy}.csv`);

    let transformedDataUSBank = transformDataUSBank(dataUSBank);

    //Need to find way to remove header row from usbank data.

    let combinedData = transformedDataMint + "\n" + transformedDataUSBank
    await setFile(`${__dirname}/output/transactions_output_${mm+1}${yy}.csv`, combinedData);
}

orchestrateData();