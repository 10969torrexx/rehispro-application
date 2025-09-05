// utils/logger.js
const fs = require('fs');
const path = require('path');

// Log file path
const logFile = path.join(__dirname, '../logs/app.log');

// Ensure log directory exists
fs.mkdirSync(path.dirname(logFile), { recursive: true });

// Manual logger function
function writeLog(message) {
    const log = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile(logFile, log, err => {
        if (err) console.error('Failed to write log:', err);
    });
}

module.exports = { writeLog };