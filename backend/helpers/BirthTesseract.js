const { writeLog } = require('../utils/logger');
function extract(text, regex) {
    const match = text.match(regex);
    return match ? match[1].trim() : null;
}

function parsedData(extractedText) {
    writeLog(`tesseract parse ${extractedText}`);
}

module.exports = { parsedData };