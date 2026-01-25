const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Archivos estáticos (SIEMPRE primero)
app.use(express.static(path.join(__dirname, '../public')));

// ===== RUTAS HTML =====
// Ruta raíz redirige a login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Página de login
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Página principal
app.get('/Index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Index.html'));
});

// Páginas adicionales (paso1, paso2, paso3, about, config, help, casos-inspeccionados)
app.get('/:page.html', (req, res, next) => {
    const pageName = req.params.page;
    // Solo servir archivos HTML específicos de views/
    const allowedPages = ['paso1', 'paso2', 'paso3', 'about', 'config', 'help', 'casos-inspeccionados'];
    
    if (allowedPages.includes(pageName)) {
        res.sendFile(path.join(__dirname, '../views', `${pageName}.html`), (err) => {
            if (err) {
                next();
            }
        });
    } else {
        next();
    }
});

// ===== RUTAS DE LA API =====
app.use('/api', apiRoutes);

// ===== MANEJO DE ERRORES =====
// Ruta no encontrada (404)
app.use(notFound);

// Manejador de errores global
app.use(errorHandler);

module.exports = app;
