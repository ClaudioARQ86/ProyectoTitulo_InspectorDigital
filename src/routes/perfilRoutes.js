const express = require('express');
const router = express.Router();
const { getAllPerfiles } = require('../controllers/perfilController');

router.get('/', getAllPerfiles);

module.exports = router;
