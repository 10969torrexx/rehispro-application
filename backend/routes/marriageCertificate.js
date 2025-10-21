// backend\routes\marriageCertificate.js
const express = require('express');
const router = express.Router();
const MarriageCertificateController = require('../controllers/MarriageCertificateController');
const upload = require('../helpers/marriageUploadHelper');
/**
 * TODO: implementing CRUD operations for birth certificates
 */
router.post('/create', MarriageCertificateController.create);
router.get('/list', MarriageCertificateController.getAll);
router.get('/view/:id', MarriageCertificateController.view);
router.get('/upload', upload.array('files'), MarriageCertificateController.upload);

module.exports = router;