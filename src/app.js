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
// NOTA: En Vercel Serverless, los archivos incluidos están en process.cwd() o __dirname dependiendo del bundle
// Usaremos path.resolve para asegurar rutas absolutas
const publicPath = path.resolve(__dirname, '../public'); // Fallback clásico
const viewsPath = path.resolve(__dirname, '../views');   // Fallback clásico

console.log(`[App] Initializing...`);
console.log(`[App] CWD: ${process.cwd()}`);
console.log(`[App] __dirname: ${__dirname}`);
console.log(`[App] Configured Static Path (Public): ${publicPath}`);
console.log(`[App] Configured Views Path: ${viewsPath}`);

// Servir archivos estáticos
app.use('/css', express.static(path.join(publicPath, 'css'), {
    setHeaders: (res) => res.set('Content-Type', 'text/css; charset=utf-8')
}));

app.use('/js', express.static(path.join(publicPath, 'js'), {
    setHeaders: (res, filepath) => {
        if (filepath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        }
    }
}));

app.use('/assets', express.static(path.join(publicPath, 'assets')));
app.use(express.static(publicPath));

app.use('/api', apiRoutes);

// Helper para servir HTMLs
const serveHtml = (res, fileName) => {
    const filePath = path.join(viewsPath, fileName);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`[App] Error serving ${fileName} from ${filePath}:`, err);
            // Intentar con una ruta alternativa si falla (fallback para estructura Vercel plana)
            const altPath = path.join(process.cwd(), 'views', fileName);
            if (altPath !== filePath) {
                console.log(`[App] Retrying with alternative path: ${altPath}`);
                res.sendFile(altPath, (err2) => {
                    if (err2) {
                         console.error(`[App] Retry failed:`, err2);
                         res.status(404).send('File not found: ' + fileName);
                    }
                });
            } else {
                res.status(404).send('File not found: ' + fileName);
            }
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
