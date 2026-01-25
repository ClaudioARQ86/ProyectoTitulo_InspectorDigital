const express = require('express');
const router = express.Router();
const { validarAccesoCaso, obtenerCaso, obtenerCasosInspeccionados } = require('../controllers/casoController');
const { authenticateToken } = require('../middleware/auth');

// Ruta para validar acceso a un caso
router.post('/validar', validarAccesoCaso);

// Ruta para obtener casos inspeccionados por el usuario (requiere autenticación)
// Esta debe ir ANTES de la ruta /:idCaso para evitar conflictos
router.get('/inspeccionados', authenticateToken, obtenerCasosInspeccionados);

// Ruta para obtener información de un caso
router.get('/:idCaso', obtenerCaso);

module.exports = router;
