const express = require('express');
const router = express.Router();
const { validarAccesoCaso, obtenerCaso } = require('../controllers/casoController');

// Ruta para validar acceso a un caso
router.post('/validar', validarAccesoCaso);

// Ruta para obtener información de un caso
router.get('/:idCaso', obtenerCaso);

module.exports = router;
