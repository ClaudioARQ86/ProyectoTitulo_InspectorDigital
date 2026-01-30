const app = require('./app');
const config = require('./config/config');

// Para Vercel, exportar directamente la app sin listen
if (process.env.VERCEL) {
    module.exports = app;
} else {
    // Para desarrollo local
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

    process.on('SIGTERM', () => {
        console.log('🛑 SIGTERM recibido. Cerrando servidor...');
        process.exit(0);
    });

    process.on('SIGINT', () => {
        console.log('\n🛑 SIGINT recibido. Cerrando servidor...');
        process.exit(0);
    });
}
