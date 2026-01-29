const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            details: err.message
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Token inválido'
        });
    }

    if (err.code && err.code.startsWith('E')) {
        return res.status(500).json({
            error: 'Error de base de datos',
            message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
        });
    }

    res.status(err.statusCode || 500).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

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
