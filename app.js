// app.js
const express = require('express');
const { getConnection, sql } = require('./db');
const app = express();

app.use(express.json()); // Para que el servidor entienda datos en formato JSON

// Ruta para crear una nueva inspección (POST)
app.post('/api/inspecciones', async (req, res) => {
    const { asegurado_id, tipo_siniestro, descripcion } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('aseguradoId', sql.Int, asegurado_id)
            .input('tipoSiniestro', sql.VarChar, tipo_siniestro)
            .input('descripcion', sql.Text, descripcion)
            .query('INSERT INTO Inspecciones (asegurado_id, tipo_siniestro, descripcion, fecha) VALUES (@aseguradoId, @tipoSiniestro, @descripcion, GETDATE())');

        res.status(201).json({ mensaje: "Inspección registrada con éxito" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});