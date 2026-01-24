const express = require('express');
const router = express.Router();
const coberturaController = require('../controllers/coberturaController');
const { authenticateToken } = require('../middleware/auth');

// Rutas de coberturas
router.get('/', authenticateToken, coberturaController.getAllCoberturas);

module.exports = router;
