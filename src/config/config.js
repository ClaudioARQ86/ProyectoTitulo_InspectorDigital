require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    JWT_SECRET: process.env.JWT_SECRET || 'inspector-digital-secret-key-2026',
    JWT_EXPIRES_IN: '24h',
    
    DB_USER: process.env.DB_USER || 'creyes_alumnoiplacex',
    DB_PASSWORD: process.env.DB_PASSWORD || 'NuevaClave123',
    DB_SERVER: process.env.DB_SERVER || 'inspectordigital1.database.windows.net',
    DB_NAME: process.env.DB_NAME || 'free-sql-db-2451406',
    
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'cookie-secret-key',
    COOKIE_MAX_AGE: 24 * 60 * 60 * 1000
};
