const { getConnection } = require('../config/database');
const sql = require('mssql');

const guardarDanos = async (req, res) => {
    let transaction;
    
    try {
        const { idRecinto, descripcion, superficie, volumen } = req.body;
        const fotos = req.files;

        if (!idRecinto || !descripcion) {
            return res.status(400).json({
                success: false,
                message: 'IDRecinto y Descripción son requeridos'
            });
        }

        const pool = await getConnection();
        transaction = new sql.Transaction(pool);
        await transaction.begin();

        const queryMaxId = `SELECT ISNULL(MAX(IDDanos), 0) + 1 as NextID FROM Danos`;
        const resultMaxId = await new sql.Request(transaction).query(queryMaxId);
        const nextIdDanos = resultMaxId.recordset[0].NextID;

        const queryDanos = `
            INSERT INTO Danos (IDDanos, IDRecinto, Descripcion, Superficie, Volumen)
            VALUES (@idDanos, @idRecinto, @descripcion, @superficie, @volumen)
        `;

        await new sql.Request(transaction)
            .input('idDanos', sql.Int, nextIdDanos)
            .input('idRecinto', sql.Int, idRecinto)
            .input('descripcion', sql.NVarChar(sql.MAX), descripcion)
            .input('superficie', sql.Decimal(10, 2), superficie || null)
            .input('volumen', sql.Decimal(10, 2), volumen || null)
            .query(queryDanos);

        if (fotos && fotos.length > 0) {
            const queryMaxFotoId = `SELECT ISNULL(MAX(IDFoto), 0) as MaxID FROM Fotos`;
            const resultMaxFoto = await new sql.Request(transaction).query(queryMaxFotoId);
            let nextIdFoto = resultMaxFoto.recordset[0].MaxID + 1;

            const queryFoto = `
                INSERT INTO Fotos (IDFoto, IDDanos, BinarioImagen)
                VALUES (@idFoto, @idDanos, @binarioImagen)
            `;

            for (const foto of fotos) {
                await new sql.Request(transaction)
                    .input('idFoto', sql.Int, nextIdFoto)
                    .input('idDanos', sql.Int, nextIdDanos)
                    .input('binarioImagen', sql.VarBinary(sql.MAX), foto.buffer)
                    .query(queryFoto);
                
                nextIdFoto++;
            }
        }

        await transaction.commit();

        return res.status(201).json({
            success: true,
            message: 'Daños y fotos guardados correctamente',
            data: {
                idDanos: nextIdDanos,
                cantidadFotos: fotos ? fotos.length : 0
            }
        });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('❌ Error al guardar daños:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al guardar los daños',
            error: error.message
        });
    }
};

const obtenerDetalleDano = async (req, res) => {
    try {
        const { idDano } = req.params;

        if (!idDano) {
            return res.status(400).json({
                success: false,
                message: 'ID de daño es requerido'
            });
        }

        const pool = await getConnection();
        
        const query = `
            SELECT 
                d.IDDanos,
                d.Descripcion as DescripcionDanos,
                d.Superficie,
                d.Volumen,
                c.IDCaso,
                co.Nombre as NombreCompania,
                cb.Descripcion as DescripcionCobertura,
                CONCAT(a.Nombre, ' ', a.ApellidoPaterno, ' ', a.ApellidoMaterno) as NombreAsegurado,
                CONCAT(a.RUT, '-', a.DV) as RutAsegurado,
                b.Descripcion as BienAsegurado,
                r.Direccion as DireccionRecinto,
                u.NombreUsuario,
                p.Tipo as TipoPerfil
            FROM Danos d
            INNER JOIN Recinto r ON d.IDRecinto = r.IDRecinto
            INNER JOIN Bienes b ON r.IDBienes = b.IDBienes
            INNER JOIN Asegurado a ON b.IDAsegurado = a.IDAsegurado
            INNER JOIN Caso c ON a.IDAsegurado = c.IDAsegurado
            INNER JOIN Compania co ON c.IDCompania = co.IDCompania
            INNER JOIN Cobertura cb ON co.IDCobertura = cb.IDCobertura
            LEFT JOIN CasoAsignado ca ON c.IDCaso = ca.IDCaso
            LEFT JOIN Perfil p ON ca.IDPerfil = p.IDPerfil
            LEFT JOIN Usuario u ON p.IDPerfil = u.IDPerfil
            WHERE d.IDDanos = @idDano
        `;

        const result = await pool.request()
            .input('idDano', sql.Int, idDano)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró la inspección'
            });
        }

        const detalle = result.recordset[0];

        // Obtener fotos asociadas
        const queryFotos = `
            SELECT IDFoto, BinarioImagen
            FROM Fotos
            WHERE IDDanos = @idDano
        `;

        const resultFotos = await pool.request()
            .input('idDano', sql.Int, idDano)
            .query(queryFotos);

        // Convertir binarios a base64 para enviar al frontend
        const fotos = resultFotos.recordset.map(foto => {
            const base64 = Buffer.from(foto.BinarioImagen).toString('base64');
            return `data:image/jpeg;base64,${base64}`;
        });

        detalle.Fotos = fotos;

        return res.status(200).json({
            success: true,
            data: detalle
        });

    } catch (error) {
        console.error('❌ Error al obtener detalle de daño:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el detalle de la inspección',
            error: error.message
        });
    }
};

const eliminarDano = async (req, res) => {
    let transaction;
    
    try {
        const { idDano } = req.params;

        if (!idDano) {
            return res.status(400).json({
                success: false,
                message: 'ID de daño es requerido'
            });
        }

        const pool = await getConnection();
        transaction = new sql.Transaction(pool);
        await transaction.begin();

        // Primero eliminar las fotos asociadas
        const queryDeleteFotos = `DELETE FROM Fotos WHERE IDDanos = @idDano`;
        await new sql.Request(transaction)
            .input('idDano', sql.Int, idDano)
            .query(queryDeleteFotos);

        // Luego eliminar el registro de daños
        const queryDeleteDano = `DELETE FROM Danos WHERE IDDanos = @idDano`;
        const result = await new sql.Request(transaction)
            .input('idDano', sql.Int, idDano)
            .query(queryDeleteDano);

        if (result.rowsAffected[0] === 0) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'No se encontró la inspección a eliminar'
            });
        }

        await transaction.commit();

        return res.status(200).json({
            success: true,
            message: 'Inspección eliminada correctamente'
        });

    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('❌ Error al eliminar daño:', error);
        return res.status(500).json({
            success: false,
            message: 'No se puede eliminar, debido a que no se han Inspeccionado los daños de la propiedad.',
            error: error.message
        });
    }
};

module.exports = {
    guardarDanos,
    obtenerDetalleDano,
    eliminarDano
};
