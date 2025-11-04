const db = require('../db');
const { writeLog } = require('../utils/logger');

exports.create = (params) => {
    return new Promise((resolve, reject) => {
        try {
            const {
                creator_id,
                filename,
                filepath,
                filetype,
                filesize,
                document_type,
            } = params;

            const query = `
                INSERT INTO files (
                creator_id,
                filename,
                filepath,
                filetype,
                filesize,
                document_type
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.run(
                query,
                [creator_id, filename, filepath, filetype, filesize, document_type],
                function (err) {
                    if (err) {
                        console.error('Error inserting file:', err);
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                }
            );
        } catch (error) {
            console.error('Unexpected error:', error);
            reject(error);
        }
    });
};