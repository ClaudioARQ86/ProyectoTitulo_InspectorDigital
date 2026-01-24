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
let connecting = false;

const getConnection = async () => {
    try {
        // Si ya hay un pool conectado, verificar si está disponible
        if (pool && pool.connected) {
            return pool;
        }

        // Si ya se está conectando, esperar
        if (connecting) {
            await new Promise(resolve => setTimeout(resolve, 100));
            return getConnection();
        }

        // Iniciar nueva conexión
        connecting = true;
        
        // Cerrar pool anterior si existe pero no está conectado
        if (pool) {
            try {
                await pool.close();
            } catch (err) {
                // Ignorar errores al cerrar
            }
            pool = null;
        }

        pool = new sql.ConnectionPool(dbConfig);
        
        pool.on('error', err => {
            console.error('❌ Error en el pool de conexiones:', err.message);
            pool = null;
        });

        await pool.connect();
        connecting = false;
        console.log('✅ Conexión a Azure SQL establecida');
        
        return pool;
    } catch (error) {
        connecting = false;
        pool = null;
        console.error('❌ Error de conexión a Azure SQL:', error.message);
        throw error;
    }
};

// Cerrar conexión al terminar (solo para entornos no serverless)
if (process.env.NODE_ENV !== 'production') {
    process.on('exit', async () => {
        if (pool) {
            await pool.close();
            console.log('🔌 Conexión a Azure SQL cerrada');
        }
    });
}

module.exports = { getConnection, sql };
