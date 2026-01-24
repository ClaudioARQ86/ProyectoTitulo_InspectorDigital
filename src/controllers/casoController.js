const { getConnection } = require('../config/database');

// Verifica que el IDCaso existe y que el RUT del asegurado coincide
const validarAccesoCaso = async (req, res) => {
    try {
        const { idCaso, rutAsegurado } = req.body;

        if (!idCaso || !rutAsegurado) {
            return res.status(400).json({
                success: false,
                message: 'IDCaso y RUT Asegurado son requeridos'
            });
        }

        const pool = await getConnection();
        
        // Consulta para validar el caso y el asegurado
        // Concatenamos RUT + '-' + DV para comparar con el formato completo
        const query = `
            SELECT 
                c.IDCaso,
                c.IDAsegurado,
                cb.IDCobertura,
                CONCAT(a.RUT, '-', a.DV) as RUTAsegurado,
                a.Nombre as NombreAsegurado,
                a.ApellidoMaterno,
                a.ApellidoPaterno,
                co.Nombre,
                cb.Descripcion,
                r.IDRecinto
            FROM Caso c
            INNER JOIN Asegurado a ON a.IDAsegurado = c.IDAsegurado
            INNER JOIN Compania co ON co.IDCompania = c.IDCompania
            INNER JOIN Cobertura cb ON cb.IDCobertura = co.IDCobertura
            INNER JOIN Bienes b ON b.IDAsegurado = a.IDAsegurado
            INNER JOIN Recinto r ON r.IDBienes = b.IDBienes
            WHERE c.IDCaso = @idCaso AND CONCAT(a.RUT, '-', a.DV) = @rutAsegurado
        `;

        const result = await pool.request()
            .input('idCaso', idCaso)
            .input('rutAsegurado', rutAsegurado)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Caso no encontrado o RUT Asegurado no coincide'
            });
        }

        const caso = result.recordset[0];

        return res.status(200).json({
            success: true,
            message: 'Acceso autorizado',
            data: {
                idCaso: caso.IDCaso,
                idAsegurado: caso.IDAsegurado,
                nombreAsegurado: `${caso.NombreAsegurado} ${caso.ApellidoPaterno} ${caso.ApellidoMaterno}`,
                rutAsegurado: caso.RUTAsegurado,
                idCobertura: caso.IDCobertura,
                nombreCompania: caso.Nombre,
                descripcionCobertura: caso.Descripcion,
                idRecinto: caso.IDRecinto
            }
        });

    } catch (error) {
        console.error('❌ Error al validar acceso al caso:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al validar el caso',
            error: error.message
        });
    }
};

//Obtener información completa de un caso
const obtenerCaso = async (req, res) => {
    try {
        const { idCaso } = req.params;

        const pool = await getConnection();
        
        const query = `
            SELECT 
                c.*,
                a.*
            FROM Caso c
            INNER JOIN Asegurado a ON c.IDAsegurado = a.IDAsegurado
            WHERE c.IDCaso = @idCaso
        `;

        const result = await pool.request()
            .input('idCaso', idCaso)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Caso no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: result.recordset[0]
        });

    } catch (error) {
        console.error('❌ Error al obtener caso:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el caso',
            error: error.message
        });
    }
};

module.exports = {
    validarAccesoCaso,
    obtenerCaso
};
