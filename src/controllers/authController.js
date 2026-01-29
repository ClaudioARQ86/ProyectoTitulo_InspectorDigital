const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getConnection, sql } = require('../config/database');
const config = require('../config/config');

const register = async (req, res) => {
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
                INSERT INTO Usuario (NombreUsuario, Email, PasswordHash, NombreCompleto, IDPerfil, Activo)
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
        console.error('Error en registro:', error);
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
        }

        const pool = await getConnection();

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(`
                SELECT IDUsuario, NombreUsuario, Email, PasswordHash, NombreCompleto, IDPerfil, Activo
                FROM Usuario
                WHERE (NombreUsuario = @username OR Email = @username) AND Activo = 1
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = result.recordset[0];

        const validPassword = await bcrypt.compare(password, user.PasswordHash);

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
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: config.NODE_ENV === 'production',
            maxAge: config.COOKIE_MAX_AGE
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
        console.error('Error en login:', error);
        res.status(500).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Sesión cerrada exitosamente' });
};

const getCurrentUser = async (req, res) => {
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
        console.error('Error obteniendo usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login,
    logout,
    getCurrentUser
};
