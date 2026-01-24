-- ================================================
-- INSTRUCCIONES PARA CONFIGURAR EL SISTEMA DE LOGIN
-- ================================================

-- 1. Primero, asegúrate de que la tabla Usuario esté creada
--    (ya debería estar si ejecutaste el script.sql principal)

-- 2. Crear algunos perfiles de ejemplo (si no existen)
IF NOT EXISTS (SELECT *
FROM Perfil
WHERE IDPerfil = 1)
BEGIN
    INSERT INTO Perfil
        (IDPerfil, Tipo)
    VALUES
        (1, 'Administrador');
END

IF NOT EXISTS (SELECT *
FROM Perfil
WHERE IDPerfil = 2)
BEGIN
    INSERT INTO Perfil
        (IDPerfil, Tipo)
    VALUES
        (2, 'Inspector');
END

IF NOT EXISTS (SELECT *
FROM Perfil
WHERE IDPerfil = 3)
BEGIN
    INSERT INTO Perfil
        (IDPerfil, Tipo)
    VALUES
        (3, 'Usuario');
END

-- 3. Verificar que la tabla Usuario existe
IF EXISTS (SELECT *
FROM sys.tables
WHERE name = 'Usuario')
BEGIN
    PRINT 'Tabla Usuario existe correctamente';
END
ELSE
BEGIN
    PRINT 'ERROR: La tabla Usuario no existe. Ejecute primero el script.sql';
END

-- ================================================
-- USUARIOS DE PRUEBA
-- ================================================
-- NOTA: Las contraseñas se deben encriptar en el backend
-- Los siguientes INSERT son solo para referencia de estructura
-- Usa el formulario de registro en login.html para crear usuarios

-- Para crear usuarios de prueba, puedes:
-- 1. Usar el formulario de registro en http://localhost:3000/login.html
-- 2. O hacer una petición POST a /api/auth/register con el siguiente JSON:
--
-- {
--   "username": "admin",
--   "email": "admin@inspectordigital.com",
--   "password": "admin123",
--   "fullName": "Administrador Sistema",
--   "perfilId": 1
-- }

-- ================================================
-- CONSULTAS ÚTILES PARA VERIFICAR USUARIOS
-- ================================================

-- Ver todos los usuarios registrados
SELECT
    IDUsuario,
    NombreUsuario,
    Email,
    NombreCompleto,
    IDPerfil,
    Activo,
    FechaCreacion,
    UltimoAcceso
FROM Usuario
ORDER BY FechaCreacion DESC;

-- Ver usuarios con sus perfiles
SELECT
    u.IDUsuario,
    u.NombreUsuario,
    u.Email,
    u.NombreCompleto,
    p.Tipo AS TipoPerfil,
    u.Activo,
    u.FechaCreacion,
    u.UltimoAcceso
FROM Usuario u
    LEFT JOIN Perfil p ON u.IDPerfil = p.IDPerfil
ORDER BY u.FechaCreacion DESC;

-- Desactivar un usuario (en lugar de eliminarlo)
-- UPDATE Usuario SET Activo = 0 WHERE IDUsuario = [ID];

-- Reactivar un usuario
-- UPDATE Usuario SET Activo = 1 WHERE IDUsuario = [ID];

-- Eliminar un usuario específico (usar con precaución)
-- DELETE FROM Usuario WHERE IDUsuario = [ID];

-- ================================================
-- NOTAS DE SEGURIDAD
-- ================================================
-- 1. NUNCA almacenes contraseñas en texto plano
-- 2. Cambia JWT_SECRET en producción (archivo .env)
-- 3. Usa HTTPS en producción
-- 4. Implementa rate limiting para prevenir ataques de fuerza bruta
-- 5. Considera agregar autenticación de dos factores (2FA)
-- 6. Implementa políticas de contraseñas fuertes
-- 7. Registra intentos de login fallidos
