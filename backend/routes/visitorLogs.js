const express = require('express');
const router = express.Router();
const VisitorLogsController = require('../controllers/VisitorLogsController');
const upload = require('../helpers/marriageUploadHelper');

router.post('/create', VisitorLogsController.create);
module.exports = router;