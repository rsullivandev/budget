const fs = require('fs').promises;
const d3 = require('d3');
const { readFile, transformData, setFile } = require('./mintTransform');

test('test mint conversion rules', async () => {
    let data = await readFile(`${__dirname}/testData/testInputMintData.csv`);
    let transformedData = transformData(data);
    let testData = await fs.readFile(`${__dirname}/testData/testOutputFormatMint.csv`, 'utf-8');
    expect(transformedData).toBe(testData);
})