const db = require('../db');
const { writeLog } = require('../utils/logger');

async function storeFile(data) {
  const query = `
    INSERT INTO uploaded_files (creator_id, file_name, file_path)
    VALUES (?, ?, ?)
  `;

  try {
    const jsonPaths = JSON.stringify(data.file_paths);

    // ✅ Await this line
    const result = await db.run(query, [
      data.creator_id,
      data.file_name,
      jsonPaths
    ]);

    console.log('✅ Uploaded file record inserted with ID:', result.lastID);
    return result.lastID;
  } catch (err) {
    console.error('❌ Error inserting uploaded file record:', err);
    throw err;
  }
}
module.exports = { storeFile };