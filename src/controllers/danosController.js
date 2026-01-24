const { getConnection } = require('../config/database');
const sql = require('mssql');

/**
 * Guardar daños y fotos del caso
 */
const guardarDanos = async (req, res) => {
    let transaction;
    
    try {
        const { idRecinto, descripcion, superficie, volumen } = req.body;
        const fotos = req.files; // Archivos de multer

        if (!idRecinto || !descripcion) {
            return res.status(400).json({
                success: false,
                message: 'IDRecinto y Descripción son requeridos'
            });
        }

        const pool = await getConnection();
        transaction = new sql.Transaction(pool);
        await transaction.begin();

        // 1. Obtener el próximo IDDanos
        const queryMaxId = `SELECT ISNULL(MAX(IDDanos), 0) + 1 as NextID FROM Danos`;
        const resultMaxId = await new sql.Request(transaction).query(queryMaxId);
        const nextIdDanos = resultMaxId.recordset[0].NextID;

        // 2. Insertar en Danos con ID explícito
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

        // 3. Insertar fotos si existen
        if (fotos && fotos.length > 0) {
            // Obtener el siguiente IDFoto disponible
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
                
                nextIdFoto++; // Incrementar para la siguiente foto
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

module.exports = {
    guardarDanos
};
