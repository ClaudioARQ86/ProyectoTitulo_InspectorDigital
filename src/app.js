const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Middleware para CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de rutas estáticas más robusta para Vercel
// En Vercel, process.cwd() es la raíz del proyecto
const publicPath = path.join(process.cwd(), 'public');
const viewsPath = path.join(process.cwd(), 'views');

console.log(`[App] Public path configured to: ${publicPath}`);
console.log(`[App] Views path configured to: ${viewsPath}`);

// Servir archivos estáticos
app.use('/css', express.static(path.join(publicPath, 'css'), {
    maxAge: '1d',
    setHeaders: (res) => res.set('Content-Type', 'text/css; charset=utf-8')
}));

app.use('/js', express.static(path.join(publicPath, 'js'), {
    maxAge: '1d',
    setHeaders: (res, filepath) => {
        if (filepath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        }
    }
}));

app.use('/assets', express.static(path.join(publicPath, 'assets'), { maxAge: '7d' }));
app.use(express.static(publicPath));

app.use('/api', apiRoutes);

// Helper para servir HTMLs
const serveHtml = (res, fileName) => {
    res.sendFile(path.join(viewsPath, fileName), (err) => {
        if (err) {
            console.error(`[App] Error serving ${fileName}:`, err);
            res.status(404).sendFile(path.join(viewsPath, 'login.html')); // Fallback seguro
        }
    });
};

app.get('/', (req, res) => serveHtml(res, 'login.html'));
app.get('/login.html', (req, res) => serveHtml(res, 'login.html'));
app.get('/Index.html', (req, res) => serveHtml(res, 'Index.html'));

app.get('/:page.html', (req, res, next) => {
    const pageName = req.params.page;
    const allowedPages = ['paso1', 'paso2', 'paso3', 'about', 'config', 'help', 'casos-inspeccionados'];
    
    if (allowedPages.includes(pageName)) {
        serveHtml(res, `${pageName}.html`);
    } else {
        next();
    }
});

app.use(notFound);

app.use(errorHandler);

module.exports = app;
