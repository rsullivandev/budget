const fs = require('fs').promises;

const setFile = async (outputFileLocation, data) => {
    try {
        await fs.writeFile(outputFileLocation, data);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    setFile: setFile
}