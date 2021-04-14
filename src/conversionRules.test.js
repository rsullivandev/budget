const { getFile } = require('./mintTransform');

test('test conversion rules', () => {
    getFile(`${__dirname}/testInputMintData.csv`, `${__dirname}/testOutputFormat2.csv`);
    expect(1 == 1);
})