// app.js
const express = require('express');
const path = require('path');
const { getConnection, sql } = require('./db');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Middleware de manejo de errores
const handleError = (res, error, statusCode = 500) => {
    console.error(error);
    res.status(statusCode).json({ error: error.message });
};

// ===== ASEGURADOS =====
// GET: Obtener todos los asegurados
app.get('/api/asegurados', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT * FROM Asegurado ORDER BY IDAsegurado');
        res.json(result.recordset);
    } catch (error) {
        handleError(res, error);
    }
});

// GET: Obtener un asegurado por ID
app.get('/api/asegurados/:id', async (req, res) => {
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
        handleError(res, error);
    }
});

// POST: Crear nuevo asegurado
app.post('/api/asegurados', async (req, res) => {
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
        res.status(201).json({ mensaje: 'Asegurado creado exitosamente' });
    } catch (error) {
        handleError(res, error, 400);
    }
});

// ===== BIENES =====
// GET: Obtener bienes de un asegurado
app.get('/api/asegurados/:id/bienes', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('IDAsegurado', sql.Int, req.params.id)
            .query('SELECT * FROM Bienes WHERE IDAsegurado = @IDAsegurado');
        res.json(result.recordset);
    } catch (error) {
        handleError(res, error);
    }
});

// POST: Crear nuevo bien
app.post('/api/bienes', async (req, res) => {
    const { IDBienes, IDAsegurado, Descripcion } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IDBienes', sql.Int, IDBienes)
            .input('IDAsegurado', sql.Int, IDAsegurado)
            .input('Descripcion', sql.VarChar, Descripcion)
            .query(`INSERT INTO Bienes (IDBienes, IDAsegurado, Descripcion)
                    VALUES (@IDBienes, @IDAsegurado, @Descripcion)`);
        res.status(201).json({ mensaje: 'Bien registrado exitosamente' });
    } catch (error) {
        handleError(res, error, 400);
    }
});

// ===== RECINTOS =====
// GET: Obtener recintos de un bien
app.get('/api/bienes/:id/recintos', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('IDBienes', sql.Int, req.params.id)
            .query('SELECT * FROM Recinto WHERE IDBienes = @IDBienes');
        res.json(result.recordset);
    } catch (error) {
        handleError(res, error);
    }
});

// POST: Crear nuevo recinto
app.post('/api/recintos', async (req, res) => {
    const { IDRecinto, IDBienes, Direccion } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IDRecinto', sql.Int, IDRecinto)
            .input('IDBienes', sql.Int, IDBienes)
            .input('Direccion', sql.VarChar, Direccion)
            .query(`INSERT INTO Recinto (IDRecinto, IDBienes, Direccion)
                    VALUES (@IDRecinto, @IDBienes, @Direccion)`);
        res.status(201).json({ mensaje: 'Recinto registrado exitosamente' });
    } catch (error) {
        handleError(res, error, 400);
    }
});

// ===== DAÑOS =====
// GET: Obtener daños de un recinto
app.get('/api/recintos/:id/danos', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('IDRecinto', sql.Int, req.params.id)
            .query('SELECT * FROM Danos WHERE IDRecinto = @IDRecinto');
        res.json(result.recordset);
    } catch (error) {
        handleError(res, error);
    }
});

// POST: Registrar daños en un recinto
app.post('/api/danos', async (req, res) => {
    const { IDDanos, IDRecinto, Descripcion } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IDDanos', sql.Int, IDDanos)
            .input('IDRecinto', sql.Int, IDRecinto)
            .input('Descripcion', sql.VarChar, Descripcion)
            .query(`INSERT INTO Danos (IDDanos, IDRecinto, Descripcion)
                    VALUES (@IDDanos, @IDRecinto, @Descripcion)`);
        res.status(201).json({ mensaje: 'Daño registrado exitosamente' });
    } catch (error) {
        handleError(res, error, 400);
    }
});

// ===== CASOS =====
// GET: Obtener todos los casos
app.get('/api/casos', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`SELECT c.*, a.Nombre, a.Rut, comp.Nombre as CompaniaNombre 
                    FROM Caso c
                    LEFT JOIN Asegurado a ON c.IDAsegurado = a.IDAsegurado
                    LEFT JOIN Compania comp ON c.IDCompania = comp.IDCompania
                    ORDER BY c.IDCaso`);
        res.json(result.recordset);
    } catch (error) {
        handleError(res, error);
    }
});

// POST: Crear nuevo caso
app.post('/api/casos', async (req, res) => {
    const { IDCaso, IDCompania, IDAsegurado } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('IDCaso', sql.Int, IDCaso)
            .input('IDCompania', sql.Int, IDCompania)
            .input('IDAsegurado', sql.Int, IDAsegurado)
            .query(`INSERT INTO Caso (IDCaso, IDCompania, IDAsegurado)
                    VALUES (@IDCaso, @IDCompania, @IDAsegurado)`);
        res.status(201).json({ mensaje: 'Caso creado exitosamente' });
    } catch (error) {
        handleError(res, error, 400);
    }
});

// Ruta raíz - Servir Index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;