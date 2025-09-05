const fs = require('fs');
const path = require('path');
const traceFile = path.join(__dirname, '../logs/querytrace.log');

function logQuery(query) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${query}\n`;
    fs.appendFileSync(traceFile, logEntry);
}

function interpolateQuery(query, values) {
  let i = 0;
  return query.replace(/\?/g, () => {
    const val = values[i++];
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return val;
    return `'${String(val).replace(/'/g, "''")}'`; // escape quotes
  });
}

module.exports = {
    logQuery,
    interpolateQuery
};
