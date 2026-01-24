# 🔧 Guía de Instalación de Node.js y npm

## ❌ Problema Detectado

```
npm : El término 'npm' no se reconoce como nombre de un cmdlet...
```

Esto significa que **Node.js no está instalado** en tu sistema Windows.

---

## ✅ Solución: Instalar Node.js

### **Paso 1: Descargar Node.js**

1. Visita el sitio oficial: **https://nodejs.org/**
2. Verás dos versiones disponibles:
   - **LTS (Long Term Support)** - ⭐ **RECOMENDADA**
   - **Current** - Última versión

3. **Descarga la versión LTS** (ej: v20.11.0 LTS)
4. Selecciona el instalador para Windows (64-bit): `node-v20.x.x-x64.msi`

### **Paso 2: Instalar Node.js**

1. **Ejecuta el instalador** descargado (.msi)
2. Acepta los términos de licencia
3. **IMPORTANTE:** En la pantalla de "Custom Setup", asegúrate de marcar:
   - ✅ Node.js runtime
   - ✅ npm package manager
   - ✅ **"Add to PATH"** (¡Esto es crucial!)

4. Haz clic en "Next" hasta completar la instalación
5. Reinicia **todas** las ventanas de PowerShell/CMD abiertas

### **Paso 3: Verificar la Instalación**

Abre una **nueva** ventana de PowerShell y ejecuta:

```powershell
node --version
```

Deberías ver algo como: `v20.11.0`

```powershell
npm --version
```

Deberías ver algo como: `10.2.4`

---

## 🚀 Continuar con el Proyecto

Una vez que Node.js esté instalado correctamente:

### **1. Navega a tu proyecto**

```powershell
cd "f:\_Estudios\01 - Ipacex - Analista Programador\29 - Proyecto de Titulación\ProyectoTitulo_InspectorDigital"
```

### **2. Instala las dependencias**

```powershell
npm install
```

Esto instalará:

- express
- mssql
- dotenv
- bcryptjs
- jsonwebtoken
- cookie-parser
- nodemon (dev)

### **3. Inicia el servidor**

```powershell
npm start
```

O en modo desarrollo:

```powershell
npm run dev
```

### **4. Abre el navegador**

```
http://localhost:3000/login.html
```

---

## 📋 Comandos Útiles de npm

```powershell
# Ver versión de npm
npm --version

# Ver versión de Node.js
node --version

# Instalar dependencias del proyecto
npm install

# Instalar una dependencia específica
npm install nombre-paquete

# Iniciar el servidor (según package.json)
npm start

# Modo desarrollo con nodemon
npm run dev

# Ver lista de paquetes instalados
npm list

# Actualizar npm a la última versión
npm install -g npm@latest

# Limpiar caché de npm (si hay problemas)
npm cache clean --force
```

---

## 🐛 Solución de Problemas

### **Problema: "npm no se reconoce" después de instalar**

**Solución:**

1. Cierra TODAS las ventanas de PowerShell/CMD
2. Abre una nueva ventana de PowerShell
3. Verifica: `node --version` y `npm --version`

Si sigue sin funcionar:

1. Busca "Variables de entorno" en Windows
2. En "Variables del sistema", busca "Path"
3. Asegúrate de que existe esta ruta:
   ```
   C:\Program Files\nodejs\
   ```
4. Si no existe, agrégala manualmente
5. Reinicia PowerShell

### **Problema: "Permission denied" o errores de permisos**

**Solución:**

```powershell
# Ejecuta PowerShell como Administrador
npm install
```

### **Problema: Instalación lenta**

**Solución:**

```powershell
# Limpiar caché
npm cache clean --force

# Reinstalar
npm install
```

### **Problema: Conflictos de versiones**

**Solución:**

```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 📦 Verificar Instalación del Proyecto

Después de `npm install`, verifica que se haya creado:

```
ProyectoTitulo_InspectorDigital/
├── node_modules/          ← Carpeta con dependencias (creada)
├── package-lock.json      ← Archivo de bloqueo (creado)
└── package.json           ← Ya existente
```

---

## 🔐 Configuración del Sistema de Login

Una vez que `npm install` funcione correctamente:

### **1. Ejecutar Scripts SQL**

Conecta a tu base de datos Azure SQL y ejecuta:

```sql
-- Primero: script.sql principal (incluye tabla Usuario)
-- Ubicación: ANEXOS/script.sql

-- Segundo: configuración adicional
-- Ubicación: ANEXOS/login-setup.sql
```

### **2. Configurar Variables de Entorno (Opcional)**

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_USER=creyes_alumno
DB_PASSWORD=NuevaClave123
DB_SERVER=inspectordigital1.database.windows.net
DB_NAME=free-sql-db-2451406
JWT_SECRET=inspector-digital-secret-key-2026
NODE_ENV=development
PORT=3000
```

### **3. Iniciar el Servidor**

```powershell
npm start
```

Deberías ver:

```
Conexión a Azure SQL establecida
Server running on port 3000
```

### **4. Probar el Login**

1. Abre: `http://localhost:3000/login.html`
2. Regístrate con un nuevo usuario
3. Inicia sesión
4. Serás redirigido a Index.html

---

## 🎯 Lista de Verificación

- [ ] Node.js instalado (v18 o superior)
- [ ] npm instalado (v9 o superior)
- [ ] PowerShell reiniciado
- [ ] `npm install` ejecutado sin errores
- [ ] Carpeta `node_modules` creada
- [ ] Scripts SQL ejecutados en la base de datos
- [ ] Servidor iniciado con `npm start`
- [ ] Login accesible en http://localhost:3000/login.html

---

## 📞 Enlaces Útiles

- **Node.js Oficial:** https://nodejs.org/
- **Documentación de npm:** https://docs.npmjs.com/
- **Node.js en Windows:** https://nodejs.org/en/download/
- **Verificar instalación:** https://nodejs.org/en/download/package-manager/

---

## 💡 Consejo

Si trabajas con múltiples proyectos de Node.js, considera usar **nvm-windows** (Node Version Manager) para gestionar diferentes versiones de Node.js:

https://github.com/coreybutler/nvm-windows

---

## ✨ Resumen Rápido

```powershell
# 1. Instalar Node.js desde https://nodejs.org/
# 2. Reiniciar PowerShell
# 3. Verificar instalación
node --version
npm --version

# 4. Instalar dependencias del proyecto
npm install

# 5. Iniciar servidor
npm start

# 6. Abrir navegador
# http://localhost:3000/login.html
```

---

**Una vez que Node.js esté instalado, todo lo demás funcionará correctamente.** 🎉

Si necesitas ayuda adicional, revisa la documentación oficial de Node.js o contacta al equipo de soporte.
