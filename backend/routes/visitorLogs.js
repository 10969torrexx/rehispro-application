const express = require('express');
const router = express.Router();
const VisitorLogsController = require('../controllers/VisitorLogsController');

router.post('/create', VisitorLogsController.create);
router.get('/list', VisitorLogsController.list);
router.put('/update-status/:id', VisitorLogsController.updateStatus);
router.get('/latest', VisitorLogsController.latest);
module.exports = router;