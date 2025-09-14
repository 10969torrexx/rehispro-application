const express = require('express');
const router = express.Router();
const deathCertificateController = require('../controllers/DeathCertificateController');

// Existing route for creating a death certificate
router.post('/create', deathCertificateController.create);

// Add routes for other CRUD operations
router.get('/find', deathCertificateController.find);           // Retrieve a specific death certificate
router.get('/list', deathCertificateController.list);          // List all death certificates
router.put('/update/:id', deathCertificateController.update);  // Update a specific death certificate
router.delete('/delete/:id', deathCertificateController.remove); // Delete a specific death certificate

module.exports = router;