# Inspector Digital - Sistema de Siniestros

Sistema integral de gestión de siniestros desarrollado con Node.js, HTML, CSS y Azure SQL Database.

## Características

- ✅ Gestión de Asegurados
- ✅ Registro de Bienes
- ✅ Administración de Recintos
- ✅ Registro de Daños
- ✅ Gestión de Casos
- ✅ Interfaz responsive
- ✅ Backend seguro con Node.js
- ✅ Base de datos Azure SQL

## Requisitos

- Node.js v14.0 o superior
- npm o yarn
- Acceso a Azure SQL Database
- Navegador moderno (Chrome, Firefox, Safari, Edge)

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
