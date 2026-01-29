const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const aseguradoRoutes = require('./aseguradoRoutes');
const perfilRoutes = require('./perfilRoutes');
const casoRoutes = require('./casoRoutes');
const coberturaRoutes = require('./coberturaRoutes');
const danosRoutes = require('./danosRoutes');

router.use('/auth', authRoutes);
router.use('/asegurados', aseguradoRoutes);
router.use('/perfiles', perfilRoutes);
router.use('/casos', casoRoutes);
router.use('/coberturas', coberturaRoutes);
router.use('/danos', danosRoutes);

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
