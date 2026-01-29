const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { getConnection, sql } = require('./db');
const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'inspector-digital-secret-key-2026';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/Index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/public/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

app.get('/public/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.js'));
});

const handleError = (res, error, statusCode = 500) => {
    console.error(error);
    res.status(statusCode).json({ error: error.message });
};

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, fullName, perfilId } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }

        const pool = await getConnection();

        const existingUser = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Usuario WHERE NombreUsuario = @username OR Email = @email');

        if (existingUser.recordset.length > 0) {
            return res.status(400).json({ error: 'El usuario o email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .input('fullName', sql.VarChar, fullName || null)
            .input('perfilId', sql.Int, perfilId || null)
            .query(`
                INSERT INTO Usuario (NombreUsuario, Email, Password, NombreCompleto, IDPerfil, Activo)
                OUTPUT INSERTED.IDUsuario, INSERTED.NombreUsuario, INSERTED.Email, INSERTED.NombreCompleto
                VALUES (@username, @email, @password, @fullName, @perfilId, 1)
            `);

        const newUser = result.recordset[0];

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: newUser.IDUsuario,
                username: newUser.NombreUsuario,
                email: newUser.Email,
                fullName: newUser.NombreCompleto
            }
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
        }

        const pool = await getConnection();

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(`
                SELECT IDUsuario, NombreUsuario, Email, Password, NombreCompleto, IDPerfil, Activo
                FROM Usuario
                WHERE (NombreUsuario = @username OR Email = @username) AND Activo = 1
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = result.recordset[0];

        const validPassword = await bcrypt.compare(password, user.Password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        await pool.request()
            .input('userId', sql.Int, user.IDUsuario)
            .query('UPDATE Usuario SET UltimoAcceso = GETDATE() WHERE IDUsuario = @userId');

        const token = jwt.sign(
            {
                id: user.IDUsuario,
                username: user.NombreUsuario,
                email: user.Email,
                perfilId: user.IDPerfil
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.IDUsuario,
                username: user.NombreUsuario,
                email: user.Email,
                fullName: user.NombreCompleto,
                perfilId: user.IDPerfil
            }
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Sesión cerrada exitosamente' });
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query(`
                SELECT IDUsuario, NombreUsuario, Email, NombreCompleto, IDPerfil, UltimoAcceso
                FROM Usuario
                WHERE IDUsuario = @userId AND Activo = 1
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ user: result.recordset[0] });
    } catch (error) {
        handleError(res, error);
    }
});

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;