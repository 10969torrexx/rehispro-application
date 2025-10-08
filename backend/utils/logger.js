const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/app.log');

fs.mkdirSync(path.dirname(logFile), { recursive: true });

function writeLog(message) {
    const now = new Date();
    const timestamp = now.toLocaleString('en-PH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const log = `[${timestamp}] ${message}\n`;
    fs.appendFile(logFile, log, err => {
        if (err) console.error('Failed to write log:', err);
    });
}

module.exports = { writeLog };