const app = require('./app');
const config = require('./config/config');

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║   🚀 Inspector Digital - Sistema de Siniestros            ║
║                                                            ║
║   🌐 Servidor: http://localhost:${PORT}                      ║
║   🔐 Login:    http://localhost:${PORT}/login.html           ║
║   📊 API:      http://localhost:${PORT}/api                  ║
║                                                            ║
║   📝 Entorno:  ${config.NODE_ENV}                             ║
╚════════════════════════════════════════════════════════════╝
    `);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM recibido. Cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT recibido. Cerrando servidor...');
    process.exit(0);
});
