const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER || 'creyes_alumnoiplacex',
    password: process.env.DB_PASSWORD || 'NuevaClave123',
    server: process.env.DB_SERVER || 'inspectordigital1.database.windows.net',
    database: process.env.DB_NAME || 'free-sql-db-2451406',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // Obligatorio para Azure SQL
        trustServerCertificate: false,
        connectionTimeout: 30000,
        requestTimeout: 30000
    }
};

let pool = null;

const getConnection = async () => {
    try {
        if (!pool) {
            pool = new sql.ConnectionPool(dbConfig);
            await pool.connect();
            console.log('✅ Conexión a Azure SQL establecida');
        }
        return pool;
    } catch (error) {
        console.error('❌ Error de conexión a Azure SQL:', error.message);
        throw error;
    }
};

// Cerrar conexión al terminar
process.on('exit', async () => {
    if (pool) {
        await pool.close();
        console.log('🔌 Conexión a Azure SQL cerrada');
    }
});

module.exports = { getConnection, sql };
