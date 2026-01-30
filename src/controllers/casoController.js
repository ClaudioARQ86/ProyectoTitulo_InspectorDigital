const { getConnection } = require('../config/database');

const validarAccesoCaso = async (req, res) => {
    try {
        console.log('[VALIDAR] /api/casos/validar called with body:', req.body);
        const { idCaso, rutAsegurado } = req.body;

        if (!idCaso || !rutAsegurado) {
            console.log('[VALIDAR] Missing idCaso or rutAsegurado');
            return res.status(400).json({
                success: false,
                message: 'IDCaso y RUT Asegurado son requeridos'
            });
        }

        const pool = await getConnection();
        console.log('[VALIDAR] DB connection acquired, running query for', idCaso, rutAsegurado);
        
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

        console.log('[VALIDAR] Query executed, rows:', result.recordset.length);

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

const obtenerCasosInspeccionados = async (req, res) => {
    try {
        const idUsuario = req.user.id;

        const pool = await getConnection();
        
        const query = `
            SELECT 
                u.NombreUsuario,
                p.Tipo,
                c.IDCaso,
                CONCAT(a.Nombre, ' ', a.ApellidoPaterno, ' ', a.ApellidoMaterno) AS NombreAsegurado,
                CONCAT(a.Rut, '-', a.DV) AS RutAsegurado,
                co.Nombre,
                cb.Descripcion AS Cobertura,
                b.Descripcion AS BienAsegurado,
                r.Direccion AS Recinto,
                d.Descripcion AS Danos,
                d.IDDanos
            FROM Caso c
            INNER JOIN Asegurado a ON c.IDAsegurado = a.IDAsegurado
            INNER JOIN Compania co ON c.IDCompania = co.IDCompania
            INNER JOIN Cobertura cb ON co.IDCobertura = cb.IDCobertura
            INNER JOIN BIENES b ON a.IDAsegurado = b.IDAsegurado
            INNER JOIN Recinto r ON b.IDBienes = r.IDBienes
            LEFT JOIN Danos d ON r.IDRecinto = d.IDRecinto
            LEFT JOIN CasoAsignado ca ON c.IDCaso = ca.IDCaso
            LEFT JOIN Perfil p ON ca.IDPerfil = p.IDPerfil
            LEFT JOIN Usuario u ON p.IDPerfil = u.IDPerfil
            WHERE u.IDUsuario = @idUsuario           
            ORDER BY d.IDDanos DESC;
        `;

        const result = await pool.request()
            .input('idUsuario', idUsuario)
            .query(query);

        return res.status(200).json({
            success: true,
            data: result.recordset
        });

    } catch (error) {
        console.error('❌ Error al obtener casos inspeccionados:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los casos inspeccionados',
            error: error.message
        });
    }
};

module.exports = {
    validarAccesoCaso,
    obtenerCaso,
    obtenerCasosInspeccionados
};
