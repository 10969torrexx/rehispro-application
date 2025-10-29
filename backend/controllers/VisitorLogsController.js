const db = require('../db');
const { writeLog } = require('../utils/logger');

exports.create = (req, res) =>  {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }
        writeLog(`INFPO [visitor controller][create] ${JSON.stringify(formData)}`);

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