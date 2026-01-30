// Vercel Serverless Function Entry Point
const path = require('path');

// Configurar variable de entorno para Vercel
process.env.VERCEL = 'true';

const app = require('../src/app');

module.exports = app;
