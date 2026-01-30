# Inspector Digital - Sistema de Siniestros

Sistema integral de gestión de siniestros desarrollado con **arquitectura modular MVC** usando Node.js, Express y Azure SQL Database.

## 🌐 Demo en Vivo

**URL:** https://proyecto-titulo-inspector-digital-f.vercel.app/login.html

## ⭐ Características Principales

- ✅ **Arquitectura Modular MVC** (Model-View-Controller)
- ✅ **Sistema de Login y Autenticación** (JWT)
- ✅ Gestión de Asegurados
- ✅ Registro de Bienes
- ✅ Administración de Recintos
- ✅ Registro de Daños
- ✅ Gestión de Casos
- ✅ Interfaz responsive
- ✅ Backend seguro con Node.js/Express
- ✅ Base de datos Azure SQL
- ✅ Desplegado en Vercel

## 🏗️ Arquitectura Modular

```
src/
├── config/         # Configuraciones (BD, JWT, etc.)
├── controllers/    # Lógica de negocio
├── routes/         # Definición de endpoints
├── middleware/     # Auth, errores, validaciones
└── utils/          # Funciones auxiliares
```

📖 **Ver documentación completa:** [docs/ESTRUCTURA_MODULAR.md](docs/ESTRUCTURA_MODULAR.md)

## 🔐 Sistema de Autenticación

- Registro de usuarios con validación
- Login con JWT (JSON Web Tokens)
- Contraseñas encriptadas con bcrypt
- Sesiones persistentes
- Protección de rutas

📖 **Documentación del Login:** Ver [LOGIN_README.md](LOGIN_README.md)

## Requisitos

- Node.js v14.0 o superior
- npm o yarn
- Acceso a Azure SQL Database
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🚀 Inicio Rápido

### Opción 1: Usar la versión desplegada

Simplemente visita: https://proyecto-titulo-inspector-digital-f.vercel.app/login.html

### Opción 2: Desarrollo Local

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd ProyectoTitulo_InspectorDigital
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de Azure SQL:

```
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_SERVER=tu-servidor.database.windows.net
DB_NAME=InspectorDigital
PORT=3000
```

### 4. Crear la base de datos

Ejecutar el script SQL en tu servidor Azure SQL:

```sql
-- Ejecutar el contenido de ANEXOS/script.sql en Azure SQL
```

### 5. Iniciar el servidor

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## Estructura del Proyecto

```
ProyectoTitulo_InspectorDigital/
├── app.js                 # Servidor Express y rutas API
├── db.js                  # Configuración de conexión Azure SQL
├── Index.html             # Interfaz principal (HTML puro)
├── style.css              # Estilos responsive
├── public/
│   └── script.js          # Lógica del frontend (JavaScript puro)
├── ANEXOS/
│   └── script.sql         # Script de creación de base de datos
├── package.json           # Dependencias del proyecto
├── .env.example           # Ejemplo de variables de entorno
└── README.md              # Este archivo
```

## Endpoints de la API

### Asegurados

- `GET /api/asegurados` - Obtener todos los asegurados
- `GET /api/asegurados/:id` - Obtener un asegurado
- `POST /api/asegurados` - Crear nuevo asegurado

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere autenticación)

### Asegurados

- `GET /api/asegurados` - Obtener todos los asegurados
- `GET /api/asegurados/:id` - Obtener asegurado específico
- `POST /api/asegurados` - Crear nuevo asegurado

### Bienes

- `GET /api/asegurados/:id/bienes` - Obtener bienes de un asegurado
- `POST /api/bienes` - Crear nuevo bien

### Recintos

- `GET /api/bienes/:id/recintos` - Obtener recintos de un bien
- `POST /api/recintos` - Crear nuevo recinto

### Daños

- `GET /api/recintos/:id/danos` - Obtener daños de un recinto
- `POST /api/danos` - Registrar daño

### Casos

- `GET /api/casos` - Obtener todos los casos
- `POST /api/casos` - Crear nuevo caso

## 📚 Documentación Adicional

- **[LOGIN_README.md](LOGIN_README.md)** - Documentación completa del sistema de autenticación
- **[GUIA_RAPIDA_LOGIN.md](GUIA_RAPIDA_LOGIN.md)** - Guía rápida de inicio con login
- **[VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)** - Guía completa para desplegar en Vercel
- **[VERCEL_TROUBLESHOOTING.md](VERCEL_TROUBLESHOOTING.md)** - Solución de problemas en Vercel
- **[INSTALAR_NODEJS.md](INSTALAR_NODEJS.md)** - Guía para instalar Node.js

## 🚀 Desplegar en Vercel

1. Haz fork del repositorio
2. Importa el proyecto en Vercel
3. Configura las variables de entorno
4. ¡Despliega!

📖 **Ver guía completa:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js, Express.js
- **Base de Datos**: Azure SQL Database
- **Control de Versiones**: Git

## Notas de Seguridad

- Las credenciales de base de datos se almacenan en `.env` (nunca commitear)
- Las contraseñas no se transmiten en el cliente
- Las conexiones a Azure SQL usan encriptación SSL
- Validación de entrada en todos los endpoints

## Soporte

Para reportar problemas o sugerencias, contactar al equipo de desarrollo.

## Licencia

Proyecto académico - Titulación Analista Programador IPACEX 2026
