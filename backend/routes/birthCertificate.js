const express = require('express');
const router = express.Router();
const BirthCertificateController = require('../controllers/BirthCertificateController');

/**
 * TODO: implementing CRUD operations for birth certificates
 */
    router.post('/create', BirthCertificateController.create);
    router.get('/list', BirthCertificateController.list);
    router.put('/:id', BirthCertificateController.update);
    router.delete('/:id', BirthCertificateController.remove);
    router.get('/view/:id', BirthCertificateController.view);
module.exports = router;