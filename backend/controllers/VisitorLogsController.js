const db = require('../db');
const { writeLog } = require('../utils/logger');

exports.create = (req, res) =>  {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }
        writeLog(`INFO [visitor controller][create] ${JSON.stringify(formData)}`);

        const fieldMap = {
            creatorId: 'creator_id',
            name: 'name',
            contactNumber: 'contact_number',
            address: 'address',
            purpose: 'purpose',
            remarks: 'remarks'
        };

        const columns = [];
        const values = [];
        for (const key in formData) {
            if (fieldMap[key]) {
                columns.push(fieldMap[key]);
                values.push(formData[key]);
            }
        }
        const placeholders = columns.map(() => '?').join(', ');
        const query = `
            INSERT INTO visitor_logs (${columns.join(', ')})
            VALUES (${placeholders})
        `;
        db.run(query, values, function (err) {
            if (err) {
                console.error('[DB Error]', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Database insert failed',
                    error: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: 'Visitor log added successfully',
                id: this.lastID
            });
        });

    } catch (error) {
        writeLog('ERROR [visitor controller][create]', error);
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });  
    }
};

exports.list = (req, res) => { 
    try {
        const query = `
            SELECT 
                v.*, 
                u.full_name AS officer
            FROM visitor_logs v
            LEFT JOIN users u ON v.creator_id = u.id
            ORDER BY v.created_at DESC
        `;

        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('[DB Error]', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Database query failed',
                    error: err.message
                });
            }
            writeLog(`INFO [visitor controller][list] ${JSON.stringify(rows)}`);
            res.status(200).json({
                success: true,
                data: rows
            });
        });
    } catch (error) {
        writeLog('ERROR [visitor controller][getAll]', error);
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

exports.updateStatus = (req, res) => {
    try {
        const logId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const query = `
            UPDATE visitor_logs
            SET status = ?
            WHERE id = ?
        `;

        writeLog(`INFO [visitor controller][updateStatus] Updating log ID (${logId}) to status ${status}`);

        db.run(query, [status, logId], function (err) {
            if (err) {
                console.error('[DB Error]', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Database update failed',
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({ success: false, message: 'Visitor log not found' });
            }

            res.status(200).json({
                success: true,
                message: 'Visitor log status updated successfully'
            });
        });
    } catch (error) {
        writeLog('ERROR [visitor controller][updateStatus]', error);
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}