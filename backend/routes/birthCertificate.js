const express = require('express');
const upload = require('../helpers/uploadHelper');
const router = express.Router();
const BirthCertificateController = require('../controllers/BirthCertificateController');

/**
 * TODO: implementing CRUD operations for birth certificates
 */
    router.post('/create', BirthCertificateController.create);
    router.get('/list', BirthCertificateController.list);
    router.post('/upload-and-scan', upload.array('files'), BirthCertificateController.uploadAndScan);
    router.get('/view/:id', BirthCertificateController.view);

module.exports = router;