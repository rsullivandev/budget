const fs = require('fs').promises;
const d3 = require('d3');
const { readFile } = require('readFile');
const { transformDataMint } = require('services/mintTransform');
const { transformDataUSBank } = require('services/usBankTransform');

test('test mint conversion rules', async () => {
    let data = await readFile(`${__dirname}/testData/testInputMintData.csv`);
    let transformedData = transformDataMint(data);
    let testData = await fs.readFile(`${__dirname}/testData/testOutputFormatMint.csv`, 'utf-8');
    expect(transformedData).toBe(testData);
});

test('test usbank conversion rules', async () => {
    let data = await readFile(`${__dirname}/testData/testInputUSBankData.csv`);
    let transformedData = transformDataUSBank(data);
    let testData = await fs.readFile(`${__dirname}/testData/testOutputFormatUSBank.csv`, 'utf-8');
    expect(transformedData).toBe(testData);
})

test('test combined output', async () => {
    let dataMint = await readFile(`${__dirname}/testData/testInputMintData.csv`);
    let transformedDataMint = transformDataMint(dataMint);
    let dataUSBank = await readFile(`${__dirname}/testData/testInputUSBankData.csv`);
    let transformedDataUSBank = transformDataUSBank(dataUSBank);

    let combinedData = transformedDataMint + '\n' + transformedDataUSBank;
    let testDataCombined = await fs.readFile(`${__dirname}/testData/testOutputFormatCombined.csv`, 'utf-8');
    expect(combinedData).toBe(testDataCombined);
})