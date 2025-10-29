const db = require('../db');
const { writeLog } = require('../utils/logger');

exports.create = (req, res) =>  {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(400).json({ success: false, message: 'No Data' });
        }
        writeLog('INFPO [visitor controller][download]', formData);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });  
    }
};
    