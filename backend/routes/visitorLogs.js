const express = require('express');
const router = express.Router();
const MarriageCertificateController = require('../controllers/MarriageCertificateController');
const upload = require('../helpers/marriageUploadHelper');

router.post('/create', MarriageCertificateController.create);
module.exports = router;