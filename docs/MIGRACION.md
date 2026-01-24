# 🔄 Guía de Migración a Estructura Modular

## ⚠️ Cambios Importantes

Tu proyecto ha sido reorganizado en una **estructura modular profesional**. Aquí está todo lo que necesitas saber para trabajar con la nueva estructura.

---

## 🆚 Comparativa: Antes vs Ahora

### **Comandos de Inicio**

| Antes            | Ahora                                   |
| ---------------- | --------------------------------------- |
| `node app.js`    | `npm start` o `node src/server.js`      |
| `nodemon app.js` | `npm run dev` o `nodemon src/server.js` |

### **Archivos Movidos**

| Archivo Anterior    | Nueva Ubicación                |
| ------------------- | ------------------------------ |
| `app.js` (raíz)     | `src/app.js` + `src/server.js` |
| `db.js` (raíz)      | `src/config/database.js`       |
| `login.html` (raíz) | `views/login.html`             |
| `Index.html` (raíz) | `views/Index.html`             |
| `style.css` (raíz)  | `public/style.css`             |
| `pages/` (raíz)     | `views/pages/`                 |
| Docs `.md` (raíz)   | `docs/`                        |

---

## 🚀 Cómo Usar el Proyecto Ahora

### **1. Instalar dependencias (primera vez)**

```bash
npm install
```

### **2. Iniciar el servidor**

**Producción:**

```bash
npm start
```

**Desarrollo (con auto-reload):**

```bash
npm run dev
```

### **3. Acceder a la aplicación**

```
http://localhost:3000/login.html
```

---

## 📝 Cómo Trabajar con la Nueva Estructura

### **Agregar un Nuevo Endpoint**

#### **Antes (todo en app.js):**

```javascript
// app.js (línea 200+)
app.get("/api/nuevo-endpoint", async (req, res) => {
  // Lógica aquí
});
```

#### **Ahora (modular):**

**1. Crear controlador:** `src/controllers/nuevoController.js`

```javascript
const getNuevoEndpoint = async (req, res) => {
  try {
    // Lógica aquí
    res.json({ message: "Éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNuevoEndpoint };
```

**2. Crear rutas:** `src/routes/nuevoRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const nuevoController = require("../controllers/nuevoController");

router.get("/", nuevoController.getNuevoEndpoint);

module.exports = router;
```

**3. Registrar en router principal:** `src/routes/index.js`

```javascript
const nuevoRoutes = require("./nuevoRoutes");

router.use("/nuevo-endpoint", nuevoRoutes);
```

---

## 🛠️ Acceso a la Base de Datos

### **Antes:**

```javascript
const { getConnection, sql } = require("./db");
```

### **Ahora:**

```javascript
const { getConnection, sql } = require("../config/database");
```

---

## 🔐 Usar Middleware de Autenticación

### **Antes:**

El middleware estaba dentro de app.js

### **Ahora:**

```javascript
const { authenticateToken } = require("../middleware/auth");

// En tus rutas:
router.get("/protegida", authenticateToken, controlador.metodo);
```

---

## 🎨 Archivos del Frontend

### **HTML:**

- Ubicación: `views/`
- Ejemplo: `views/login.html`, `views/Index.html`

### **CSS:**

- Ubicación: `public/style.css`

### **JavaScript:**

- Ubicación: `public/`
- Ejemplo: `public/script.js`, `public/login.js`

---

## 📦 Estructura de Importaciones

### **En controladores:**

```javascript
const { getConnection, sql } = require("../config/database");
const config = require("../config/config");
```

### **En rutas:**

```javascript
const express = require("express");
const router = express.Router();
const controller = require("../controllers/miController");
const { authenticateToken } = require("../middleware/auth");
```

### **En app.js:**

```javascript
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);
```

---

## 🔧 Configuración

### **Variables de Entorno (.env):**

```env
DB_USER=creyes_alumno
DB_PASSWORD=NuevaClave123
DB_SERVER=inspectordigital1.database.windows.net
DB_NAME=free-sql-db-2451406
JWT_SECRET=tu-secreto-jwt
NODE_ENV=development
PORT=3000
```

### **Acceder a configuración:**

```javascript
const config = require("./config/config");

console.log(config.PORT); // 3000
console.log(config.JWT_SECRET); // tu-secreto-jwt
```

---

## 🐛 Depuración

### **Ver logs del servidor:**

```bash
npm run dev
```

### **Logs están en:**

- ✅ Terminal donde ejecutaste el servidor
- ✅ `console.log()` en controladores

### **Errores comunes:**

#### Error: "Cannot find module '../config/database'"

**Solución:** Verifica que la ruta relativa sea correcta.

#### Error: "app.listen is not a function"

**Solución:** Usa `npm start` en lugar de `node app.js`

#### Error: "Cannot GET /login.html"

**Solución:** El archivo está en `views/login.html`, pero el servidor lo sirve en `/login.html`

---

## 📂 Navegación por Archivos

### **Estructura Visual:**

```
📦 ProyectoTitulo_InspectorDigital
├── 📂 src                    ← Backend (Node.js/Express)
│   ├── 📂 config            ← Configuraciones
│   ├── 📂 controllers       ← Lógica de negocio
│   ├── 📂 routes            ← Definición de rutas
│   ├── 📂 middleware        ← Middleware (auth, errores)
│   ├── 📂 utils             ← Utilidades
│   ├── app.js               ← Configuración de Express
│   └── server.js            ← Inicio del servidor
│
├── 📂 views                  ← HTML (Frontend)
├── 📂 public                 ← CSS, JS, imágenes
├── 📂 docs                   ← Documentación
└── 📂 ANEXOS                 ← Scripts SQL
```

---

## ✅ Checklist de Migración

- [x] Estructura modular creada
- [x] Controllers separados
- [x] Routes organizadas
- [x] Middleware independiente
- [x] Configuración centralizada
- [x] Archivos HTML movidos a views/
- [x] CSS y JS movidos a public/
- [x] Documentación en docs/
- [x] package.json actualizado
- [x] vercel.json actualizado

---

## 🎯 Próximos Pasos

### **1. Familiarízate con la estructura**

- Explora las carpetas `src/`
- Lee los archivos en `src/controllers/`
- Revisa `src/routes/index.js`

### **2. Prueba el servidor**

```bash
npm run dev
```

### **3. Prueba la aplicación**

- Abre http://localhost:3000/login.html
- Registra un usuario
- Inicia sesión

### **4. Aprende a agregar funcionalidades**

- Sigue el patrón: Controller → Routes → Register
- Revisa `docs/ESTRUCTURA_MODULAR.md`

---

## 📚 Recursos

- **Documentación completa:** `docs/ESTRUCTURA_MODULAR.md`
- **Guía de login:** `docs/LOGIN_README.md`
- **Despliegue:** `docs/DESPLIEGUE_VERCEL.md`

---

## 🆘 ¿Necesitas ayuda?

1. Lee `docs/ESTRUCTURA_MODULAR.md`
2. Revisa los ejemplos en `src/controllers/`
3. Consulta los comentarios en el código

---

**🎉 ¡Bienvenido a la nueva estructura modular!**

Es más organizada, escalable y profesional. Tómate tu tiempo para familiarizarte con ella.
