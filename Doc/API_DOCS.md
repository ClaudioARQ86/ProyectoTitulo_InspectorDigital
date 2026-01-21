# Documentación de API - Inspector Digital

## Base URL

```
http://localhost:3000/api
```

## Endpoints de Asegurados

### Listar todos los asegurados

```http
GET /asegurados
```

**Respuesta exitosa (200):**

```json
[
  {
    "IDAsegurado": 1001,
    "Nombre": "Juan",
    "ApellidoMaterno": "Pérez",
    "ApellidoPaterno": "García",
    "Rut": "12.345.678",
    "Dv": "K"
  }
]
```

### Obtener asegurado por ID

```http
GET /asegurados/:id
```

**Parámetros:**

- `id` (número, requerido): ID del asegurado

**Respuesta exitosa (200):**

```json
{
  "IDAsegurado": 1001,
  "Nombre": "Juan",
  "ApellidoMaterno": "Pérez",
  "ApellidoPaterno": "García",
  "Rut": "12.345.678",
  "Dv": "K"
}
```

### Crear nuevo asegurado

```http
POST /asegurados
Content-Type: application/json
```

**Body:**

```json
{
  "IDAsegurado": 1001,
  "Nombre": "Juan",
  "ApellidoMaterno": "Pérez",
  "ApellidoPaterno": "García",
  "Rut": "12.345.678",
  "Dv": "K"
}
```

**Respuesta exitosa (201):**

```json
{
  "mensaje": "Asegurado creado exitosamente"
}
```

---

## Endpoints de Bienes

### Obtener bienes de un asegurado

```http
GET /asegurados/:id/bienes
```

**Parámetros:**

- `id` (número, requerido): ID del asegurado

**Respuesta exitosa (200):**

```json
[
  {
    "IDBienes": 2001,
    "IDAsegurado": 1001,
    "Descripcion": "Casa de ladrillo"
  }
]
```

### Crear nuevo bien

```http
POST /bienes
Content-Type: application/json
```

**Body:**

```json
{
  "IDBienes": 2001,
  "IDAsegurado": 1001,
  "Descripcion": "Casa de ladrillo"
}
```

**Respuesta exitosa (201):**

```json
{
  "mensaje": "Bien registrado exitosamente"
}
```

---

## Endpoints de Recintos

### Obtener recintos de un bien

```http
GET /bienes/:id/recintos
```

**Parámetros:**

- `id` (número, requerido): ID del bien

**Respuesta exitosa (200):**

```json
[
  {
    "IDRecinto": 3001,
    "IDBienes": 2001,
    "Direccion": "Calle Principal 123"
  }
]
```

### Crear nuevo recinto

```http
POST /recintos
Content-Type: application/json
```

**Body:**

```json
{
  "IDRecinto": 3001,
  "IDBienes": 2001,
  "Direccion": "Calle Principal 123"
}
```

**Respuesta exitosa (201):**

```json
{
  "mensaje": "Recinto registrado exitosamente"
}
```

---

## Endpoints de Daños

### Obtener daños de un recinto

```http
GET /recintos/:id/danos
```

**Parámetros:**

- `id` (número, requerido): ID del recinto

**Respuesta exitosa (200):**

```json
[
  {
    "IDDanos": 4001,
    "IDRecinto": 3001,
    "Descripcion": "Grietas en paredes"
  }
]
```

### Registrar daño

```http
POST /danos
Content-Type: application/json
```

**Body:**

```json
{
  "IDDanos": 4001,
  "IDRecinto": 3001,
  "Descripcion": "Grietas en paredes"
}
```

**Respuesta exitosa (201):**

```json
{
  "mensaje": "Daño registrado exitosamente"
}
```

---

## Endpoints de Casos

### Listar todos los casos

```http
GET /casos
```

**Respuesta exitosa (200):**

```json
[
  {
    "IDCaso": 5001,
    "IDCompania": 1,
    "IDAsegurado": 1001,
    "Nombre": "Juan",
    "Rut": "12.345.678",
    "CompaniaNombre": "Seguros XYZ"
  }
]
```

### Crear nuevo caso

```http
POST /casos
Content-Type: application/json
```

**Body:**

```json
{
  "IDCaso": 5001,
  "IDCompania": 1,
  "IDAsegurado": 1001
}
```

**Respuesta exitosa (201):**

```json
{
  "mensaje": "Caso creado exitosamente"
}
```

---

## Códigos de Respuesta

| Código | Descripción                 |
| ------ | --------------------------- |
| 200    | Solicitud exitosa           |
| 201    | Recurso creado exitosamente |
| 400    | Solicitud inválida          |
| 404    | Recurso no encontrado       |
| 500    | Error del servidor          |

## Ejemplos con cURL

### Crear un asegurado

```bash
curl -X POST http://localhost:3000/api/asegurados \
  -H "Content-Type: application/json" \
  -d '{
    "IDAsegurado": 1001,
    "Nombre": "Juan",
    "ApellidoMaterno": "Pérez",
    "ApellidoPaterno": "García",
    "Rut": "12.345.678",
    "Dv": "K"
  }'
```

### Obtener todos los asegurados

```bash
curl http://localhost:3000/api/asegurados
```

### Obtener un asegurado específico

```bash
curl http://localhost:3000/api/asegurados/1001
```

---

## Notas Importantes

1. **Validación de IDs**: Los IDs deben ser únicos en sus respectivas tablas
2. **Campos requeridos**: Todos los campos del body son obligatorios
3. **Formato de datos**: Las cadenas deben estar entre comillas en JSON
4. **Conexión**: El servidor debe estar ejecutándose en http://localhost:3000
5. **Content-Type**: Siempre usar `application/json` en requests POST

## Errores Comunes

### "Asegurado no encontrado"

- Verificar que el ID existe en la base de datos
- Usar GET /asegurados para ver los IDs disponibles

### Error de conexión a Azure SQL

- Verificar credenciales en .env
- Revisar que la IP está autorizada en firewall de Azure
- Confirmar que el servidor está en línea

### "Error: Conversion failed"

- Verificar que el tipo de dato es correcto
- Números deben ser enviados sin comillas
- Texto debe estar entre comillas
