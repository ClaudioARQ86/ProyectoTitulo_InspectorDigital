# 📁 Estructura Modular del Proyecto - Inspector Digital

## 🎯 Nueva Arquitectura Modular

El proyecto ha sido reorganizado siguiendo las **mejores prácticas de Node.js/Express** con una arquitectura **MVC (Model-View-Controller)** modular y escalable.

---

## 📂 Estructura de Carpetas

```
ProyectoTitulo_InspectorDigital/
│
├── 📂 src/                           # Código fuente del backend
│   ├── 📂 config/                    # Configuraciones
│   │   ├── config.js                 # Configuración general
│   │   └── database.js               # Configuración de BD
│   │
│   ├── 📂 controllers/               # Controladores (Lógica de negocio)
│   │   ├── authController.js         # Controlador de autenticación
│   │   ├── aseguradoController.js    # Controlador de asegurados
│   │   ├── bienesController.js       # Controlador de bienes
│   │   └── casosController.js        # Controlador de casos
│   │
│   ├── 📂 middleware/                # Middleware personalizados
│   │   ├── auth.js                   # Middleware de autenticación
│   │   └── errorHandler.js           # Manejo de errores
│   │
│   ├── 📂 routes/                    # Rutas de la API
│   │   ├── index.js                  # Router principal
│   │   ├── authRoutes.js             # Rutas de autenticación
│   │   ├── aseguradoRoutes.js        # Rutas de asegurados
│   │   ├── bienesRoutes.js           # Rutas de bienes
│   │   └── casosRoutes.js            # Rutas de casos
│   │
│   ├── 📂 utils/                     # Utilidades y helpers
│   │   ├── validators.js             # Validadores
│   │   └── helpers.js                # Funciones auxiliares
│   │
│   ├── app.js                        # Configuración de Express
│   └── server.js                     # Punto de entrada del servidor
│
├── 📂 public/                        # Archivos estáticos públicos
│   ├── style.css                     # Estilos CSS
│   ├── script.js                     # Scripts generales
│   └── login.js                      # Script del login
│
├── 📂 views/                         # Archivos HTML (Frontend)
│   ├── login.html                    # Página de login
│   ├── Index.html                    # Página principal
│   └── 📂 pages/                     # Páginas adicionales
│       ├── about.html
│       ├── config.html
│       ├── help.html
│       ├── paso1.html
│       ├── paso2.html
│       └── paso3.html
│
├── 📂 docs/                          # Documentación del proyecto
│   ├── ESTRUCTURA_MODULAR.md         # Este archivo
│   ├── LOGIN_README.md               # Documentación del login
│   ├── GUIA_RAPIDA_LOGIN.md          # Guía rápida
│   ├── DESPLIEGUE_VERCEL.md          # Guía de despliegue
│   └── INSTALAR_NODEJS.md            # Instalación de Node.js
│
├── 📂 ANEXOS/                        # Scripts SQL y anexos
│   ├── script.sql                    # Script principal de BD
│   └── login-setup.sql               # Configuración del login
│
├── .env.example                      # Ejemplo de variables de entorno
├── .gitignore                        # Archivos ignorados por Git
├── .vercelignore                     # Archivos ignorados por Vercel
├── package.json                      # Dependencias del proyecto
├── vercel.json                       # Configuración de Vercel
└── README.md                         # Documentación principal

```

---

## 🏗️ Principios de la Arquitectura

### 1. **Separación de Responsabilidades**

Cada módulo tiene una responsabilidad específica:

- **Controllers**: Lógica de negocio
- **Routes**: Definición de endpoints
- **Middleware**: Funciones intermedias (auth, errores)
- **Config**: Configuraciones centralizadas

### 2. **Modularidad**

- Cada funcionalidad es un módulo independiente
- Fácil de mantener y escalar
- Código reutilizable

### 3. **Escalabilidad**

- Fácil agregar nuevas rutas y controladores
- Estructura clara y organizada
- Preparado para crecer

---

## 🔄 Flujo de una Petición

```
Cliente (Browser)
    ↓
📥 HTTP Request
    ↓
🌐 Express App (src/app.js)
    ↓
🔀 Router (src/routes/)
    ↓
🛡️ Middleware (src/middleware/)
    ↓
🎮 Controller (src/controllers/)
    ↓
💾 Database (src/config/database.js)
    ↓
📤 HTTP Response
    ↓
Cliente (Browser)
```

---

## 📝 Archivos Principales

### **src/server.js**

Punto de entrada de la aplicación. Inicia el servidor.

```javascript
const app = require("./app");
app.listen(PORT, () => {
  console.log("Servidor iniciado...");
});
```

### **src/app.js**

Configuración de Express, middleware y rutas.

```javascript
const express = require("express");
const apiRoutes = require("./routes");

app.use("/api", apiRoutes);
```

### **src/config/config.js**

Configuración centralizada del proyecto.

```javascript
module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  // ...
};
```

### **src/config/database.js**

Conexión a la base de datos Azure SQL.

```javascript
const getConnection = async () => {
  // Lógica de conexión
};
```

### **src/routes/index.js**

Router principal que agrupa todas las rutas.

```javascript
router.use("/auth", authRoutes);
router.use("/asegurados", aseguradoRoutes);
```

### **src/controllers/authController.js**

Lógica de autenticación (login, registro, etc.).

```javascript
const login = async (req, res) => {
  // Lógica de login
};
```

### **src/middleware/auth.js**

Middleware de autenticación JWT.

```javascript
const authenticateToken = (req, res, next) => {
  // Verificar token
};
```

---

## 🚀 Cómo Ejecutar el Proyecto

### **1. Instalar Dependencias**

```bash
npm install
```

### **2. Configurar Variables de Entorno**

Crea un archivo `.env`:

```env
DB_USER=creyes_alumno
DB_PASSWORD=NuevaClave123
DB_SERVER=inspectordigital1.database.windows.net
DB_NAME=free-sql-db-2451406
JWT_SECRET=tu-secreto-jwt-aqui
NODE_ENV=development
PORT=3000
```

### **3. Iniciar el Servidor**

**Modo producción:**

```bash
npm start
```

**Modo desarrollo (con nodemon):**

```bash
npm run dev
```

### **4. Acceder a la Aplicación**

- **Login:** http://localhost:3000/login.html
- **Principal:** http://localhost:3000/Index.html
- **API:** http://localhost:3000/api

---

## ➕ Cómo Agregar Nueva Funcionalidad

### **Ejemplo: Agregar módulo de "Reportes"**

#### **1. Crear el Controlador**

`src/controllers/reportesController.js`:

```javascript
const getAllReportes = async (req, res) => {
  // Lógica aquí
};

module.exports = { getAllReportes };
```

#### **2. Crear las Rutas**

`src/routes/reportesRoutes.js`:

```javascript
const express = require("express");
const router = express.Router();
const reportesController = require("../controllers/reportesController");

router.get("/", reportesController.getAllReportes);

module.exports = router;
```

#### **3. Registrar en el Router Principal**

`src/routes/index.js`:

```javascript
const reportesRoutes = require("./reportesRoutes");

router.use("/reportes", reportesRoutes);
```

¡Listo! Ya tienes el endpoint `/api/reportes` funcionando.

---

## 🔧 Ventajas de la Nueva Estructura

### ✅ **Antes (Monolítico)**

```
app.js (400+ líneas)
├── Configuración
├── Middleware
├── Rutas
├── Controladores
└── Todo mezclado ❌
```

### ✅ **Ahora (Modular)**

```
src/
├── config/         # Configuración
├── middleware/     # Middleware
├── routes/         # Rutas
├── controllers/    # Lógica
└── Separado y organizado ✅
```

### **Beneficios:**

- 📖 **Más legible:** Código claro y organizado
- 🔍 **Fácil de mantener:** Cada archivo tiene una responsabilidad
- 🚀 **Escalable:** Fácil agregar nuevas funcionalidades
- 🧪 **Testeable:** Módulos independientes fáciles de probar
- 👥 **Trabajo en equipo:** Varios desarrolladores pueden trabajar sin conflictos
- 📦 **Reutilizable:** Código modular y reutilizable

---

## 📚 Comparación de Archivos

| Archivo Antiguo | Archivo Nuevo                       | Ubicación        |
| --------------- | ----------------------------------- | ---------------- |
| `app.js`        | `src/app.js` + `src/server.js`      | Separado         |
| `db.js`         | `src/config/database.js`            | src/config/      |
| Login en app.js | `src/controllers/authController.js` | src/controllers/ |
| Rutas en app.js | `src/routes/*.js`                   | src/routes/      |
| login.html      | `views/login.html`                  | views/           |
| style.css       | `public/style.css`                  | public/          |
| Docs            | `docs/*.md`                         | docs/            |

---

## 🎯 Próximos Pasos

1. ✅ Estructura modular creada
2. 🔲 Migrar todos los controladores restantes
3. 🔲 Agregar validaciones con express-validator
4. 🔲 Implementar tests unitarios
5. 🔲 Agregar logger (Winston o Morgan)
6. 🔲 Implementar caché (Redis)
7. 🔲 Documentar API con Swagger

---

## 📖 Recursos Adicionales

- **Express Best Practices:** https://expressjs.com/en/advanced/best-practice-performance.html
- **Node.js Project Structure:** https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
- **MVC Pattern:** https://developer.mozilla.org/en-US/docs/Glossary/MVC

---

## 🆘 Soporte

Si tienes dudas sobre la nueva estructura:

1. Revisa este archivo
2. Consulta el README.md principal
3. Revisa los comentarios en el código

---

**🎉 ¡Tu proyecto ahora tiene una estructura profesional y escalable!**
