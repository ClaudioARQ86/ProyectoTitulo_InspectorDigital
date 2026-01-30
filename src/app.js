const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configurar rutas estáticas con opciones explícitas
app.use('/css', express.static(path.join(__dirname, '../public/css'), {
    maxAge: '1d',
    setHeaders: (res) => {
        res.set('Content-Type', 'text/css');
    }
}));

app.use('/js', express.static(path.join(__dirname, '../public/js'), {
    maxAge: '1d',
    setHeaders: (res) => {
        res.set('Content-Type', 'application/javascript');
    }
}));

app.use(express.static(path.join(__dirname, '../public')));

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

app.use('/api', apiRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
