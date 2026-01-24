const express = require('express');
const router = express.Router();
const { getAllPerfiles } = require('../controllers/perfilController');

// Ruta pública para obtener perfiles (necesaria en registro)
router.get('/', getAllPerfiles);

module.exports = router;
