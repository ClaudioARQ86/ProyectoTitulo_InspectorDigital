const express = require('express');
const router = express.Router();
const coberturaController = require('../controllers/coberturaController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, coberturaController.getAllCoberturas);

module.exports = router;
