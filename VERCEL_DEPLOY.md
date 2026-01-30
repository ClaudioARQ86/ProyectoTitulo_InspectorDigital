# Guía de Despliegue en Vercel

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio Git con el proyecto
- Variables de entorno configuradas en Azure SQL Database

## 🚀 Pasos para Desplegar

### 1. Instalar Vercel CLI (Opcional)

```bash
npm install -g vercel
```

### 2. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, ve a tu proyecto > Settings > Environment Variables y agrega:

```
NODE_ENV=production
JWT_SECRET=tu-secret-key-seguro-aquí
DB_USER=creyes_alumnoiplacex
DB_PASSWORD=NuevaClave123
DB_SERVER=inspectordigital1.database.windows.net
DB_NAME=free-sql-db-2451406
COOKIE_SECRET=tu-cookie-secret-aquí
```

**⚠️ IMPORTANTE:** Cambia los valores por tus credenciales reales.

### 3. Desplegar desde Git

#### Opción A: Desde el Dashboard de Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa tu repositorio Git
3. Vercel detectará automáticamente el proyecto Node.js
4. Configura las variables de entorno
5. Haz clic en "Deploy"

#### Opción B: Desde la Terminal

```bash
# Login en Vercel
vercel login

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

## 📁 Archivos de Configuración

### vercel.json

Este archivo define cómo Vercel debe construir y servir la aplicación:

- **builds**: Define el punto de entrada (`api/index.js`)
- **routes**: Configura el enrutamiento de archivos estáticos y API
- **env**: Variables de entorno específicas de Vercel

### api/index.js

Punto de entrada serverless que:

- Exporta la aplicación Express
- Maneja rutas estáticas en el entorno de Vercel
- Detecta automáticamente si está en Vercel

## 🔍 Verificación Post-Despliegue

### 1. Verificar que el sitio esté en línea

```
https://tu-proyecto.vercel.app
```

### 2. Probar el Login

```
https://tu-proyecto.vercel.app/login.html
```

### 3. Probar la API

```
https://tu-proyecto.vercel.app/api
```

### 4. Verificar la Búsqueda de Casos

```
https://tu-proyecto.vercel.app/paso1.html
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"

**Solución:** Verifica que todas las dependencias estén en `package.json`:

```bash
npm install
```

### Error: "Database connection failed"

**Solución:** Verifica las variables de entorno en Vercel:

1. Ve a Settings > Environment Variables
2. Asegúrate de que todas las variables de DB estén correctas
3. Redeploy el proyecto

### Archivos estáticos no se cargan (CSS/JS)

**Solución:** Vercel ya está configurado para servir archivos estáticos correctamente. Si tienes problemas:

1. Verifica que los archivos existan en las carpetas correctas:
   - `/public/css/`
   - `/public/js/`
   - `/views/`

2. Verifica las rutas en `vercel.json`

### Error 500 en producción

**Solución:** Revisa los logs de Vercel:

```bash
vercel logs
```

O en el dashboard: Project > Deployments > [tu deployment] > View Function Logs

## 📊 Monitoreo

### Ver Logs en Tiempo Real

```bash
vercel logs --follow
```

### Ver Logs de un Deployment Específico

```bash
vercel logs [deployment-url]
```

## 🔄 Actualizaciones

Vercel redespliega automáticamente cuando haces push a tu rama principal. Para despliegues manuales:

```bash
vercel --prod
```

## 🔒 Seguridad en Producción

### Variables de Entorno Sensibles

**NUNCA** subas archivos `.env` al repositorio. Usa solo:

- Variables de entorno de Vercel
- `.env.example` como referencia

### JWT Secret

Genera un secret seguro para producción:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📱 URLs de la Aplicación

- **Producción:** https://proyecto-titulo-inspector-digital-f.vercel.app
- **Login:** https://proyecto-titulo-inspector-digital-f.vercel.app/login.html
- **API:** https://proyecto-titulo-inspector-digital-f.vercel.app/api

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los logs: `vercel logs`
2. Verifica las variables de entorno
3. Consulta la documentación de Vercel: [vercel.com/docs](https://vercel.com/docs)

---

**Última actualización:** Enero 2026
