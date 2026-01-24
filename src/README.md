# 🚀 Backend - Inspector Digital

Código fuente del backend del sistema Inspector Digital.

## 📂 Estructura

```
src/
├── config/         # Configuraciones
├── controllers/    # Lógica de negocio
├── routes/         # Definición de endpoints
├── middleware/     # Funciones intermedias
├── utils/          # Utilidades
├── app.js          # Configuración de Express
└── server.js       # Punto de entrada
```

## 📝 Convenciones

### **Nombres de Archivos:**

- Controllers: `nombreController.js`
- Routes: `nombreRoutes.js`
- Middleware: `nombre.js`
- Config: `nombre.js`

### **Exportaciones:**

```javascript
// Controllers
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete
};

// Routes
module.exports = router;

// Config
module.exports = { config };
```

### **Imports:**

```javascript
// Relativos
const { getConnection } = require("../config/database");
const controller = require("../controllers/authController");

// NPM
const express = require("express");
const bcrypt = require("bcryptjs");
```

## 🎯 Cómo Agregar Nueva Funcionalidad

### **1. Crear Controlador**

`controllers/ejemploController.js`:

```javascript
const { getConnection, sql } = require("../config/database");

const getAll = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Tabla");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll };
```

### **2. Crear Rutas**

`routes/ejemploRoutes.js`:

```javascript
const express = require("express");
const router = express.Router();
const ejemploController = require("../controllers/ejemploController");
const { authenticateToken } = require("../middleware/auth");

// Rutas públicas
router.get("/", ejemploController.getAll);

// Rutas protegidas
router.post("/", authenticateToken, ejemploController.create);

module.exports = router;
```

### **3. Registrar en Router Principal**

`routes/index.js`:

```javascript
const ejemploRoutes = require("./ejemploRoutes");

router.use("/ejemplo", ejemploRoutes);
```

## 🛡️ Middleware

### **Autenticación:**

```javascript
const { authenticateToken } = require("../middleware/auth");

router.get("/protegida", authenticateToken, controller.method);
```

### **Manejo de Errores:**

Automático en `app.js` mediante `errorHandler`.

## 💾 Base de Datos

### **Conexión:**

```javascript
const { getConnection, sql } = require("../config/database");

const pool = await getConnection();
```

### **Queries:**

```javascript
// SELECT
const result = await pool.request().query("SELECT * FROM Tabla");

// INSERT con parámetros
await pool
  .request()
  .input("nombre", sql.VarChar, nombre)
  .query("INSERT INTO Tabla (Nombre) VALUES (@nombre)");

// UPDATE
await pool
  .request()
  .input("id", sql.Int, id)
  .input("nombre", sql.VarChar, nombre)
  .query("UPDATE Tabla SET Nombre = @nombre WHERE ID = @id");
```

## ⚙️ Configuración

### **Variables de Entorno:**

Definidas en `config/config.js`:

```javascript
const config = require("../config/config");

console.log(config.PORT);
console.log(config.JWT_SECRET);
console.log(config.NODE_ENV);
```

### **Agregar Nueva Configuración:**

1. Agregar variable en `.env`
2. Importar en `config/config.js`
3. Usar en tu código

## 🧪 Testing (Futuro)

Estructura preparada para:

- Jest
- Supertest
- Mocha/Chai

## 📖 Recursos

- Express: https://expressjs.com/
- Azure SQL: https://docs.microsoft.com/sql/
- JWT: https://jwt.io/

---

**Ver documentación completa en `/docs/ESTRUCTURA_MODULAR.md`**
