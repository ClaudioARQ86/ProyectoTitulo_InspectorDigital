const express = require('express');
const router = express.Router();
const aseguradoController = require('../controllers/aseguradoController');

// Rutas de asegurados
router.get('/', aseguradoController.getAllAsegurados);
router.get('/:id', aseguradoController.getAseguradoById);
router.post('/', aseguradoController.createAsegurado);

module.exports = router;
