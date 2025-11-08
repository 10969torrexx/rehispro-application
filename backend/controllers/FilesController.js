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
            writeLog('ERROR ❌ Error inserting uploaded file record:', err);
            return reject(err);
        }

            writeLog('INFO ✅ Uploaded file record inserted with ID:', this.lastID);
            resolve(this.lastID);
        });
    });
}

async function getFileById(id) {
  const query = `SELECT * FROM uploaded_files WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, row) => {
      if (err) {
        writeLog('INFO ❌ Error fetching uploaded file record:', err);
        return reject(err);
      }

      if (!row) {
        writeLog(`INFO ⚠️ No record found for ID: ${id}`);
        return resolve(null);
      }

      writeLog(`INFO ✅ Retrieved uploaded file record for ID: ${id}`);
      resolve(row);
    });
  });
}

module.exports = { storeFile, getFileById };    