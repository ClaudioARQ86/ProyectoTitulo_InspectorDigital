# Inspector Digital - Sistema de Siniestros

Sistema web para gestión de siniestros con Node.js, Express y Azure SQL.

## Requisitos

- Node.js v14+
- Acceso a Azure SQL Database

## Configuración

Crear un archivo .env en la raíz:

DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_SERVER=tu-servidor.database.windows.net
DB_NAME=tu_bd
PORT=3000

## Instalación y ejecución

1. npm install
2. npm start
3. Abrir http://localhost:3000/login.html

## Estructura básica

- src/: backend (routes, controllers, config)
- public/: frontend (js, css, assets)
- views/: páginas HTML

## Endpoints principales

- POST /api/auth/login
- POST /api/auth/register
- GET /api/auth/me
- POST /api/casos/validar
- GET /api/casos/inspeccionados

## Despliegue en Vercel

Configurar las variables de entorno en Vercel con los mismos nombres del .env.
