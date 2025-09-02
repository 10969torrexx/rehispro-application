const express = require('express');
const router = express.Router();
const BirthCertificateController = require('../controllers/BirthCertificateController');

/**
 * TODO: implementing CRUD operations for birth certificates
 */
    router.post('/', BirthCertificateController.create);
    router.get('/:id', BirthCertificateController.read);
    router.put('/:id', BirthCertificateController.update);
    router.delete('/:id', BirthCertificateController.remove);
    router.post('/', BirthCertificateController.find);

module.exports = router;