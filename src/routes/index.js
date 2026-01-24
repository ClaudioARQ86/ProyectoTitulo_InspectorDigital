const express = require('express');
const router = express.Router();

// Importar todas las rutas
const authRoutes = require('./authRoutes');
const aseguradoRoutes = require('./aseguradoRoutes');
const perfilRoutes = require('./perfilRoutes');

// Definir rutas de la API
router.use('/auth', authRoutes);
router.use('/asegurados', aseguradoRoutes);
router.use('/perfiles', perfilRoutes);

// Ruta de bienvenida de la API
router.get('/', (req, res) => {
    res.json({
        message: 'API Inspector Digital',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            asegurados: '/api/asegurados',
            bienes: '/api/bienes',
            casos: '/api/casos'
        }
    });
});

module.exports = router;
