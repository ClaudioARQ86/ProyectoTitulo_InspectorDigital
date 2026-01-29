const { getConnection, sql } = require('../config/database');

const getAllPerfiles = async (req, res) => {
    try {
        const pool = await getConnection();
        
        const result = await pool.request()
            .query('SELECT IDPerfil, Tipo FROM Perfil ORDER BY Tipo');
        
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener perfiles:', error);
        res.status(500).json({ error: 'Error al obtener perfiles' });
    }
};

module.exports = {
    getAllPerfiles
};
