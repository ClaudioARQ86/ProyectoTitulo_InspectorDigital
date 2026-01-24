# 🚀 Guía de Despliegue en Vercel - Inspector Digital

## ❌ Problema: "Cannot GET /login.html"

Este error ocurre porque Vercel necesita una configuración específica para aplicaciones Node.js con archivos estáticos.

---

## ✅ Solución Implementada

Se han realizado los siguientes cambios:

### 1. **vercel.json actualizado**

- Configuración de rutas para archivos estáticos
- Rutas para la API separadas
- Orden correcto de prioridad de rutas

### 2. **app.js actualizado**

- Rutas explícitas para archivos HTML
- Ruta raíz (/) redirige a login.html
- Rutas para archivos JavaScript del frontend

---

## 🔧 Configuración de Variables de Entorno en Vercel

**IMPORTANTE:** Debes configurar las variables de entorno en Vercel:

### Paso 1: Ir a tu proyecto en Vercel

1. Accede a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**

### Paso 2: Agregar las siguientes variables:

```
DB_USER=creyes_alumno
DB_PASSWORD=NuevaClave123
DB_SERVER=inspectordigital1.database.windows.net
DB_NAME=free-sql-db-2451406
JWT_SECRET=inspector-digital-secret-key-2026-vercel-production
NODE_ENV=production
```

### Paso 3: Guardar y Redesplegar

1. Guarda las variables
2. Ve a **Deployments**
3. Busca el último despliegue
4. Haz clic en los tres puntos (...) → **Redeploy**

---

## 📋 Pasos para Redesplegar

### Opción 1: Desde Git (Recomendado)

```bash
# 1. Confirma los cambios
git add .
git commit -m "Fix: Configuración de Vercel para login"
git push origin main

# Vercel detectará automáticamente los cambios y redesplegará
```

### Opción 2: Desde Vercel CLI

```bash
# Instalar Vercel CLI (si no la tienes)
npm install -g vercel

# Desplegar
vercel --prod
```

### Opción 3: Redespliegue Manual

1. Ve a tu dashboard de Vercel
2. Haz clic en tu proyecto
3. Ve a **Deployments**
4. Click en el último deployment
5. Click en **...** → **Redeploy**

---

## 🗂️ Estructura de Archivos para Vercel

Asegúrate de que estos archivos estén en tu repositorio:

```
ProyectoTitulo_InspectorDigital/
├── app.js                    ← Backend principal
├── db.js                     ← Conexión a base de datos
├── vercel.json               ← Configuración de Vercel ⭐
├── package.json              ← Dependencias
├── login.html                ← Página de login
├── Index.html                ← Página principal
├── style.css                 ← Estilos
├── public/
│   ├── script.js
│   └── login.js
└── pages/
    ├── about.html
    ├── config.html
    ├── help.html
    ├── paso1.html
    ├── paso2.html
    └── paso3.html
```

---

## 🔍 Verificar el Despliegue

Después de redesplegar, verifica:

### 1. **Página de Login**

```
https://tu-proyecto.vercel.app/login.html
```

Debería mostrar la página de login correctamente.

### 2. **Página Principal**

```
https://tu-proyecto.vercel.app/Index.html
```

### 3. **API de Autenticación**

Abre la consola del navegador (F12) y prueba:

```javascript
fetch("https://tu-proyecto.vercel.app/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "test",
    password: "test123",
  }),
});
```

---

## ⚠️ Problemas Comunes

### Problema 1: "Cannot GET /login.html" persiste

**Solución:**

1. Verifica que los cambios estén en Git
2. Haz push al repositorio
3. Espera a que Vercel redespliegue automáticamente
4. Limpia caché del navegador (Ctrl + Shift + R)

### Problema 2: Error de Base de Datos

**Solución:**

- Verifica que las variables de entorno estén configuradas en Vercel
- Asegúrate de que la IP de Vercel esté permitida en Azure SQL:
  1. Ve a Azure Portal
  2. Tu base de datos SQL
  3. Firewall and virtual networks
  4. Agrega regla: "Allow Azure services" = ON

### Problema 3: Error 500 Internal Server Error

**Solución:**

1. Ve a Vercel Dashboard → tu proyecto → Functions
2. Click en el último deployment
3. Revisa los logs para ver el error específico
4. Verifica que todas las dependencias estén en package.json:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mssql": "^9.1.1",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cookie-parser": "^1.4.6"
  }
}
```

### Problema 4: CSS o JS no cargan

**Solución:**

- Verifica que style.css y los archivos en /public/ estén en el repositorio
- Limpia caché del navegador
- Verifica las rutas en vercel.json

### Problema 5: "Module not found"

**Solución:**

```bash
# Asegúrate de que package.json esté actualizado
npm install

# Commit y push
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

---

## 🔐 Seguridad en Producción

### IMPORTANTE - Cambiar JWT_SECRET

En las variables de entorno de Vercel, usa un JWT_SECRET único y fuerte:

```bash
# Genera uno nuevo (en tu terminal local)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copia el resultado y úsalo como JWT_SECRET en Vercel
```

### Configurar CORS (si es necesario)

Si vas a acceder desde otros dominios, agrega CORS en app.js:

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);
```

Instala cors:

```bash
npm install cors
```

---

## 📊 Monitoreo del Despliegue

### Ver Logs en Tiempo Real

1. Ve a Vercel Dashboard
2. Tu proyecto → **Functions**
3. Selecciona una función (app.js)
4. Revisa los logs en tiempo real

### Métricas de Uso

1. Dashboard → Tu proyecto
2. **Analytics** para ver:
   - Visitas
   - Errores
   - Tiempo de respuesta

---

## 🎯 Checklist de Despliegue

- [ ] vercel.json actualizado con rutas correctas
- [ ] app.js con rutas explícitas para HTML
- [ ] Variables de entorno configuradas en Vercel
- [ ] Base de datos Azure SQL permite conexiones desde Azure
- [ ] Dependencias actualizadas en package.json
- [ ] Código pusheado a Git
- [ ] Vercel redesplegó automáticamente
- [ ] Login funciona en producción
- [ ] API de autenticación responde correctamente
- [ ] CSS y JS cargan correctamente

---

## 🌐 URLs de Producción

Después del despliegue exitoso, tus URLs serán:

```
Página de Login:
https://proyecto-titulo-inspector-digital-f.vercel.app/login.html

Página Principal:
https://proyecto-titulo-inspector-digital-f.vercel.app/Index.html

API de Login:
https://proyecto-titulo-inspector-digital-f.vercel.app/api/auth/login

API de Registro:
https://proyecto-titulo-inspector-digital-f.vercel.app/api/auth/register
```

---

## 💡 Consejos Adicionales

### 1. Dominio Personalizado

Puedes agregar un dominio personalizado en Vercel:

- Dashboard → Proyecto → Settings → Domains

### 2. Preview Deployments

Vercel crea un preview para cada commit:

- Útil para probar cambios antes de producción
- Cada branch tiene su propia URL

### 3. Automatic HTTPS

Vercel proporciona HTTPS automáticamente:

- No necesitas configurar certificados SSL
- Renovación automática

### 4. Edge Network

Tu app se sirve desde múltiples ubicaciones:

- Mejor rendimiento global
- Menor latencia para usuarios

---

## 📞 Soporte

Si sigues teniendo problemas:

1. **Logs de Vercel:** Dashboard → Functions → Ver logs
2. **Documentación:** https://vercel.com/docs
3. **Soporte:** https://vercel.com/support

---

## ✨ Siguiente Paso

Una vez que el despliegue funcione:

1. **Prueba el registro:** Crea un usuario de prueba
2. **Prueba el login:** Inicia sesión con ese usuario
3. **Verifica la sesión:** Navega por la aplicación

---

**¡Tu aplicación estará disponible 24/7 en Vercel!** 🎉
