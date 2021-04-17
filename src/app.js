const {readFile} = require('./readFile');
const {setFile} = require('./setFile');
const {transformDataMint} = require('./mintTransform');
const {transformDataUSBank} = require('./usBankTransform');


const orchestrateData = async () => {
    let dataMint = await readFile(`${__dirname}/testData/testInputMintData.csv`);
    let transformedDataMint = transformDataMint(dataMint);
    let dataUSBank = await readFile(`${__dirname}/testData/testInputUSBankData.csv`);
    let transformedDataUSBank = transformDataUSBank(dataUSBank);

    //Need to find way to remove header row from usbank data.

    let combinedData = transformedDataMint + "\n" + transformedDataUSBank
    await setFile(`${__dirname}/testData/testOutputFormat3.csv`, combinedData);
}

orchestrateData();