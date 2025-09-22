// backend\routes\marriageCertificate.js
const express = require('express');
const router = express.Router();
const MarriageCertificateController = require('../controllers/MarriageCertificateController');

/**
 * TODO: implementing CRUD operations for birth certificates
 */
router.post('/create', MarriageCertificateController.create);
router.get('/list', MarriageCertificateController.getAll);
router.get('/view/:id', MarriageCertificateController.view);

// router.get('/:id', MarriageCertificateController.read);
// router.put('/:id', MarriageCertificateController.update);
// router.delete('/:id', MarriageCertificateController.remove);
// router.post('/', MarriageCertificateController.find);

module.exports = router;