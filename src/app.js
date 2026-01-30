const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Middleware para CORS (importante para Vercel)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configurar rutas estáticas con opciones explícitas
app.use('/css', express.static(path.join(__dirname, '../public/css'), {
    maxAge: '1d',
    setHeaders: (res, filepath) => {
        res.set('Content-Type', 'text/css; charset=utf-8');
    }
}));

app.use('/js', express.static(path.join(__dirname, '../public/js'), {
    maxAge: '1d',
    setHeaders: (res, filepath) => {
        if (filepath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        }
    }
}));

app.use('/assets', express.static(path.join(__dirname, '../public/assets'), {
    maxAge: '7d'
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/Index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Index.html'));
});

app.get('/:page.html', (req, res, next) => {
    const pageName = req.params.page;
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

app.use(notFound);

app.use(errorHandler);

module.exports = app;
