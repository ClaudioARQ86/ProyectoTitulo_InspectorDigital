const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Middleware de autenticación JWT
 * Verifica el token en cookies o en el header Authorization
 */
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

/**
 * Middleware opcional de autenticación
 * Si hay token, lo verifica, pero no bloquea si no hay token
 */
const optionalAuth = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    
    if (token) {
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            // Token inválido, pero no bloqueamos
            req.user = null;
        }
    }
    
    next();
};

module.exports = {
    authenticateToken,
    optionalAuth
};
