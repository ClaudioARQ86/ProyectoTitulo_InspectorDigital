# 🔐 Sistema de Login - Inspector Digital

## Descripción

Sistema completo de autenticación con registro de usuarios, login y gestión de sesiones usando JWT (JSON Web Tokens).

## 🚀 Características

- ✅ Registro de nuevos usuarios
- ✅ Login con usuario/email y contraseña
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Autenticación mediante JWT
- ✅ Sesiones persistentes con cookies
- ✅ Validación de fortaleza de contraseña
- ✅ Diseño responsivo y moderno
- ✅ Protección de rutas con middleware
- ✅ Opción "Recordarme"

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

Las nuevas dependencias instaladas son:

- `bcryptjs`: Para encriptar contraseñas
- `jsonwebtoken`: Para generar y verificar tokens JWT
- `cookie-parser`: Para manejar cookies en Express

### 2. Configurar la base de datos

Ejecuta el script SQL actualizado que incluye la tabla de usuarios:

```sql
-- Ubicación: ANEXOS/script.sql
```

También puedes ejecutar el script de configuración adicional:

```sql
-- Ubicación: ANEXOS/login-setup.sql
```

### 3. Configurar variables de entorno (opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
JWT_SECRET=tu-clave-secreta-aqui
NODE_ENV=development
```

### 4. Iniciar el servidor

```bash
npm start
```

O en modo desarrollo:

```bash
npm run dev
```

## 🎯 Uso

### Acceder a la página de login

Navega a: `http://localhost:3000/login.html`

### Registrar un nuevo usuario

1. Haz clic en la pestaña "Registrarse"
2. Completa todos los campos:
   - Nombre completo
   - Nombre de usuario (único)
   - Email (único)
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. Haz clic en "Registrarse"
4. Serás redirigido automáticamente a la pestaña de login

### Iniciar sesión

1. Ingresa tu usuario o email
2. Ingresa tu contraseña
3. (Opcional) Marca "Recordarme" para sesión persistente
4. Haz clic en "Iniciar Sesión"
5. Serás redirigido a la página principal (Index.html)

## 🔒 Endpoints de la API

### Registro

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "usuario123",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "fullName": "Nombre Completo",
  "perfilId": 1
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "usuario123",
  "password": "contraseña123"
}
```

Respuesta exitosa:

```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "fullName": "Nombre Completo",
    "perfilId": 1
  }
}
```

### Logout

```http
POST /api/auth/logout
```

### Verificar sesión actual

```http
GET /api/auth/me
Authorization: Bearer {token}
```

## 🛡️ Proteger rutas

Para proteger endpoints que requieran autenticación, usa el middleware `authenticateToken`:

```javascript
// Ejemplo de ruta protegida
app.get("/api/datos-protegidos", authenticateToken, async (req, res) => {
  // req.user contendrá los datos del usuario autenticado
  console.log("Usuario autenticado:", req.user);

  // Tu lógica aquí
  res.json({ message: "Acceso autorizado", user: req.user });
});
```

## 📁 Estructura de archivos

```
ProyectoTitulo_InspectorDigital/
├── login.html              # Página de login y registro
├── app.js                  # Backend con endpoints de autenticación
├── style.css               # Estilos (incluye estilos de login)
├── package.json            # Dependencias actualizadas
├── public/
│   └── login.js           # Lógica frontend del login
├── ANEXOS/
│   ├── script.sql         # Script SQL con tabla Usuario
│   └── login-setup.sql    # Configuración adicional y ejemplos
```

## 🔐 Seguridad

### Implementado

- ✅ Contraseñas encriptadas con bcrypt (salt rounds: 10)
- ✅ Tokens JWT con expiración (24 horas)
- ✅ Cookies HttpOnly para prevenir XSS
- ✅ Validación de datos en frontend y backend
- ✅ Protección contra inyección SQL (prepared statements)
- ✅ Usuarios inactivos no pueden iniciar sesión

### Recomendaciones para producción

- [ ] Usar HTTPS en producción
- [ ] Cambiar JWT_SECRET a un valor aleatorio fuerte
- [ ] Implementar rate limiting
- [ ] Agregar CAPTCHA en el login/registro
- [ ] Implementar autenticación de dos factores (2FA)
- [ ] Registrar intentos de login fallidos
- [ ] Implementar recuperación de contraseña
- [ ] Política de contraseñas más estricta

## 🎨 Características del frontend

### Formulario de Login

- Validación en tiempo real
- Toggle para mostrar/ocultar contraseña
- Opción "Recordarme"
- Mensajes de error claros

### Formulario de Registro

- Validación de email
- Medidor de fortaleza de contraseña
- Confirmación de contraseña
- Validación de campos requeridos

### Diseño

- Responsive (móvil, tablet, desktop)
- Animaciones suaves
- Iconos de FontAwesome
- Gradientes modernos
- Feedback visual inmediato

## 🗄️ Tabla de Usuario (SQL)

```sql
CREATE TABLE Usuario (
    IDUsuario INT PRIMARY KEY IDENTITY(1,1),
    NombreUsuario VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    NombreCompleto VARCHAR(150),
    IDPerfil INT,
    Activo BIT DEFAULT 1,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    UltimoAcceso DATETIME,
    FOREIGN KEY (IDPerfil) REFERENCES Perfil(IDPerfil)
);
```

## 🐛 Solución de problemas

### Error: "Cannot find module 'bcryptjs'"

```bash
npm install
```

### Error de conexión a la base de datos

Verifica que:

- La base de datos esté en línea
- Las credenciales en `db.js` sean correctas
- La tabla `Usuario` exista

### Token inválido o expirado

- Cierra sesión y vuelve a iniciar
- Verifica que JWT_SECRET sea consistente

### Usuario no puede registrarse

- Verifica que el username y email no existan
- Asegúrate de que la contraseña tenga al menos 6 caracteres

## 📝 Notas adicionales

- Los tokens JWT expiran en 24 horas
- Las sesiones se pueden mantener con "Recordarme"
- Los usuarios inactivos (Activo = 0) no pueden iniciar sesión
- La última fecha de acceso se actualiza en cada login

## 🚀 Próximos pasos sugeridos

1. Implementar recuperación de contraseña
2. Agregar verificación de email
3. Implementar 2FA (autenticación de dos factores)
4. Crear panel de administración de usuarios
5. Agregar logs de auditoría
6. Implementar límite de intentos de login

---

**Desarrollado para:** IPACEX - Proyecto de Titulación  
**Año:** 2026  
**Sistema:** Inspector Digital - Gestión de Siniestros
