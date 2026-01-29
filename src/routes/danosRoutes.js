const express = require('express');
const router = express.Router();
const multer = require('multer');
const danosController = require('../controllers/danosController');
const { authenticateToken } = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes y videos'));
        }
    }
});

router.post('/', authenticateToken, upload.array('fotos', 20), danosController.guardarDanos);

module.exports = router;
