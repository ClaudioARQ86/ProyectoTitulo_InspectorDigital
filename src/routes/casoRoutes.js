const express = require('express');
const router = express.Router();
const { validarAccesoCaso, obtenerCaso, obtenerCasosInspeccionados } = require('../controllers/casoController');
const { authenticateToken } = require('../middleware/auth');

router.post('/validar', validarAccesoCaso);

router.get('/inspeccionados', authenticateToken, obtenerCasosInspeccionados);

router.get('/:idCaso', obtenerCaso);

module.exports = router;
