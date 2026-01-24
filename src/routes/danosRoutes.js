const express = require('express');
const router = express.Router();
const multer = require('multer');
const danosController = require('../controllers/danosController');
const { authenticateToken } = require('../middleware/auth');

// Configurar multer para recibir archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB por archivo
    },
    fileFilter: (req, file, cb) => {
        // Aceptar solo imágenes y videos
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes y videos'));
        }
    }
});

// Rutas de daños
router.post('/', authenticateToken, upload.array('fotos', 20), danosController.guardarDanos);

module.exports = router;
