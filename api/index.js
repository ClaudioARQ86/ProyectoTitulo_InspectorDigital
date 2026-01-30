// Vercel Serverless Function Entry Point
const path = require('path');
const express = require('express');

// Configurar variable de entorno para Vercel
process.env.VERCEL = 'true';

const app = require('../src/app');

// En Vercel, los archivos estáticos deben servirse de manera diferente
if (process.env.VERCEL) {
    // Servir archivos estáticos desde las carpetas public y views
    app.use('/css', express.static(path.join(__dirname, '../public/css')));
    app.use('/js', express.static(path.join(__dirname, '../public/js')));
    app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
    
    // Rutas HTML específicas
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../views/login.html'));
    });
    
    app.get('/:page.html', (req, res, next) => {
        const pageName = req.params.page;
        const filePath = path.join(__dirname, '../views', `${pageName}.html`);
        res.sendFile(filePath, (err) => {
            if (err) {
                next();
            }
        });
    });
}

module.exports = app;
