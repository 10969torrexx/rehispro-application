const db = require('../db');
const { writeLog } = require('../utils/logger');

async function storeFile(data) {
    const query = `
        INSERT INTO uploaded_files (creator_id, file_name, file_path)
        VALUES (?, ?, ?)
    `;
    const jsonPaths = JSON.stringify(data.file_paths);
    return new Promise((resolve, reject) => {
        db.run(query, [data.creator_id, data.file_name, jsonPaths], function (err) {
        if (err) {
            writeLog('INFO ❌ Error inserting uploaded file record:', err);
            return reject(err);
        }

            writeLog('INFO ✅ Uploaded file record inserted with ID:', this.lastID);
            resolve(this.lastID);
        });
    });
}
module.exports = { storeFile };