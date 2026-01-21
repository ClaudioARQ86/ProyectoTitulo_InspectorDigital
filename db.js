
const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // Ej: tu-servidor.database.windows.net
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Obligatorio para Azure SQL
        trustServerCertificate: false
    }
};

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error("Error de conexión a Azure SQL:", error);
    }
};

module.exports = { getConnection, sql };