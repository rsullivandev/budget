const fs = require('fs').promises;
const d3 = require('d3');

const readFile = async inputFile => {
    try {
        let data = await fs.readFile(inputFile, 'utf8');
        data = d3.csvParse(data);
        return data;
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    readFile: readFile
}