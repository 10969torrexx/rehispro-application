const express = require('express');
const router = express.Router();
const deathCertificateController = require('../controllers/DeathCertificateController');
const upload = require('../helpers/deathUploadHelper');

router.post('/create', deathCertificateController.create);      
router.get('/list', deathCertificateController.list);   
router.get('/view/:id', deathCertificateController.view);
router.post('/upload', upload.array('files'), deathCertificateController.uploadAndScan);
router.get('/extract-pdf/:id', deathCertificateController.download)

module.exports = router;