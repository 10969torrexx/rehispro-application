const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { writeLog } = require('../utils/logger');

const uploadDir = path.join(process.cwd(), 'backend/uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
    onFileUploadComplete: (file, req) => {
        writeLog('📁 File uploaded: ' + file.originalname + ' as ' + (Date.now() + '-' + file.originalname));
        writeLog('📨 Request body: ' + JSON.stringify(req.body));
    }
});

const upload = multer({ 
    storage,  
    limits: {
        fileSize: 1024 * 1024 * 1024
    }
});

module.exports = upload;