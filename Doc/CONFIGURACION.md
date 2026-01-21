# Guía de Configuración - Inspector Digital

## Pasos para Ejecutar el Proyecto

### Paso 1: Instalación de Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará:

- **Express**: Framework web para Node.js
- **mssql**: Driver para conectar con Azure SQL
- **dotenv**: Manejo de variables de entorno

### Paso 2: Configurar Credenciales de Azure SQL

1. Crear archivo `.env` en la raíz del proyecto
2. Copiar el contenido de `.env.example`
3. Completar con tus credenciales:

```env
DB_USER=usuario_azure_sql
DB_PASSWORD=tu_contraseña_segura
DB_SERVER=nombreservidor.database.windows.net
DB_NAME=InspectorDigital
PORT=3000
```

### Paso 3: Crear la Base de Datos

1. Conectarse a Azure SQL usando SQL Server Management Studio o Azure Data Studio
2. Copiar y ejecutar el contenido del archivo `ANEXOS/script.sql`
3. Verificar que se crearon todas las tablas

### Paso 4: Ejecutar el Servidor

```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

### Paso 5: Acceder a la Aplicación

Abrir en el navegador: http://localhost:3000

## Estructura de la Base de Datos

### Tablas Principales

| Tabla        | Descripción                       |
| ------------ | --------------------------------- |
| Asegurado    | Datos de las personas aseguradas  |
| Bienes       | Propiedades o bienes asegurados   |
| Recinto      | Ubicaciones físicas de los bienes |
| Daños        | Registro de daños encontrados     |
| Fotos        | Imágenes de los daños             |
| Caso         | Casos de siniestros               |
| CasoAsignado | Asignación de casos a perfiles    |

## Troubleshooting

### Error: Cannot find module 'mssql'

**Solución:**

```bash
npm install mssql
```

### Error: Connection timeout to Azure SQL

**Verificar:**

- Credenciales en `.env`
- Conexión a internet
- Firewall de Azure SQL permite tu IP

### Error: "Cannot POST /api/asegurados"

**Solución:**

- Asegurar que el servidor está ejecutándose
- Revisar la consola para mensajes de error

## Desarrollo Futuro

### Mejoras Sugeridas

1. Autenticación de usuarios
2. Carga de fotos/imágenes
3. Reportes PDF
4. Notificaciones por email
5. Panel administrativo
6. Historial de cambios
7. Búsquedas avanzadas

## Recursos Útiles

- [Documentación Express.js](https://expressjs.com/)
- [Documentación mssql npm](https://www.npmjs.com/package/mssql)
- [Azure SQL Database](https://azure.microsoft.com/es-es/services/sql-database/)
- [MDN - Web APIs](https://developer.mozilla.org/es/docs/Web/API)

## Contacto y Soporte

Para problemas o preguntas, contactar al equipo de desarrollo.
