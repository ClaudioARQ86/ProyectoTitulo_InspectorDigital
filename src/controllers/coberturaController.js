const { getConnection } = require('../config/database');

const getAllCoberturas = async (req, res) => {
    try {
        const pool = await getConnection();
        
        const query = `
            SELECT 
                co.IDCompania,
                co.Nombre as NombreCompania,
                cb.IDCobertura,
                cb.Descripcion as DescripcionCobertura
            FROM Compania co
            INNER JOIN Cobertura cb ON co.IDCobertura = cb.IDCobertura
            ORDER BY co.Nombre, cb.Descripcion
        `;

        const result = await pool.request().query(query);

        return res.status(200).json({
            success: true,
            data: result.recordset
        });

    } catch (error) {
        console.error('❌ Error al obtener coberturas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener coberturas',
            error: error.message
        });
    }
};

module.exports = {
    getAllCoberturas
};
