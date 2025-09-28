const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/app.log');

fs.mkdirSync(path.dirname(logFile), { recursive: true });

function writeLog(message) {
    const log = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile(logFile, log, err => {
        if (err) console.error('Failed to write log:', err);
    });
}

module.exports = { writeLog };