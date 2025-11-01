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
router.post('/upload', upload.array('files'), MarriageCertificateController.upload);
router.get('/extract-pdf/:id', MarriageCertificateController.download);
router.get('/latest', MarriageCertificateController.latest);

module.exports = router;