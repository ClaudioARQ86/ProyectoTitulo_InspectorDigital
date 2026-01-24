/**
 * Middleware de manejo de errores global
 */
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);

    // Error de validación
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            details: err.message
        });
    }

    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Token inválido'
        });
    }

    // Error de base de datos
    if (err.code && err.code.startsWith('E')) {
        return res.status(500).json({
            error: 'Error de base de datos',
            message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
        });
    }

    // Error por defecto
    res.status(err.statusCode || 500).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

/**
 * Middleware para rutas no encontradas (404)
 */
const notFound = (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.originalUrl
    });
};

module.exports = {
    errorHandler,
    notFound
};
