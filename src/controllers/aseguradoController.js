const { getConnection, sql } = require('../config/database');

const getAllAsegurados = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT * FROM Asegurado ORDER BY IDAsegurado');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error obteniendo asegurados:', error);
        res.status(500).json({ error: error.message });
    }
};

const getAseguradoById = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Asegurado WHERE IDAsegurado = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Asegurado no encontrado' });
        }
        
        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error obteniendo asegurado:', error);
        res.status(500).json({ error: error.message });
    }
};

const createAsegurado = async (req, res) => {
    const { IDAsegurado, Nombre, ApellidoMaterno, ApellidoPaterno, Rut, Dv } = req.body;
    
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IDAsegurado', sql.Int, IDAsegurado)
            .input('Nombre', sql.VarChar, Nombre)
            .input('ApellidoMaterno', sql.VarChar, ApellidoMaterno)
            .input('ApellidoPaterno', sql.VarChar, ApellidoPaterno)
            .input('Rut', sql.VarChar, Rut)
            .input('Dv', sql.VarChar, Dv)
            .query(`INSERT INTO Asegurado (IDAsegurado, Nombre, ApellidoMaterno, ApellidoPaterno, Rut, Dv)
                    VALUES (@IDAsegurado, @Nombre, @ApellidoMaterno, @ApellidoPaterno, @Rut, @Dv)`);
        
        res.status(201).json({ message: 'Asegurado creado exitosamente', id: IDAsegurado });
    } catch (error) {
        console.error('Error creando asegurado:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAsegurados,
    getAseguradoById,
    createAsegurado
};
