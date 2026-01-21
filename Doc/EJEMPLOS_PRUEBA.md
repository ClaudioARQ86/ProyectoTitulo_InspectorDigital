# EJEMPLOS DE PRUEBA - Inspector Digital

## Guía para Probar la Aplicación

Esta guía te ayudará a probar todos los módulos de la aplicación.

---

## 1. PRUEBAS EN LA INTERFAZ WEB

### Prueba 1: Registrar un Asegurado

**Pasos:**

1. Abrir http://localhost:3000
2. Ir a pestaña "Asegurados"
3. Completar el formulario con:
   - ID Asegurado: `1001`
   - Nombre: `Juan`
   - Apellido Materno: `Pérez`
   - Apellido Paterno: `García`
   - RUT: `12.345.678`
   - Dígito Verificador: `K`
4. Hacer clic en "Registrar Asegurado"
5. Debe aparecer mensaje verde: "✓ Asegurado registrado exitosamente"
6. El asegurado debe aparecer en la lista abajo

**Resultado esperado:** ✅ Asegurado visible en el listado

---

### Prueba 2: Registrar un Bien

**Pasos:**

1. Ir a pestaña "Bienes"
2. Completar el formulario con:
   - ID Bien: `2001`
   - ID Asegurado: `1001` (el que creamos antes)
   - Descripción: `Casa de ladrillo en buen estado`
3. Hacer clic en "Registrar Bien"
4. Debe aparecer mensaje verde de éxito

**Resultado esperado:** ✅ Bien registrado sin errores

---

### Prueba 3: Registrar un Recinto

**Pasos:**

1. Ir a pestaña "Recintos"
2. Completar el formulario con:
   - ID Recinto: `3001`
   - ID Bien: `2001` (el que creamos antes)
   - Dirección: `Calle Principal 123, Apto 5`
3. Hacer clic en "Registrar Recinto"
4. Debe aparecer mensaje verde de éxito

**Resultado esperado:** ✅ Recinto registrado correctamente

---

### Prueba 4: Registrar Daños

**Pasos:**

1. Ir a pestaña "Daños"
2. Completar el formulario con:
   - ID Daño: `4001`
   - ID Recinto: `3001` (el que creamos antes)
   - Descripción: `Grietas en las paredes principales, vidrio roto en ventana frontal`
3. Hacer clic en "Registrar Daño"
4. Debe aparecer mensaje verde de éxito

**Resultado esperado:** ✅ Daño registrado en el sistema

---

### Prueba 5: Crear un Caso

**Pasos:**

1. Ir a pestaña "Casos"
2. Completar el formulario con:
   - ID Caso: `5001`
   - ID Compañía: `1`
   - ID Asegurado: `1001` (el que creamos antes)
3. Hacer clic en "Registrar Caso"
4. Debe aparecer mensaje verde de éxito
5. El caso debe aparecer en el listado

**Resultado esperado:** ✅ Caso creado y visible en listado

---

## 2. PRUEBAS CON POSTMAN O cURL

### Prueba 6: GET - Listar Asegurados

**Con cURL:**

```bash
curl http://localhost:3000/api/asegurados
```

**Respuesta esperada:**

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

---

### Prueba 7: GET - Obtener Asegurado Específico

**Con cURL:**

```bash
curl http://localhost:3000/api/asegurados/1001
```

**Respuesta esperada:**

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

---

### Prueba 8: GET - Obtener Bienes de un Asegurado

**Con cURL:**

```bash
curl http://localhost:3000/api/asegurados/1001/bienes
```

**Respuesta esperada:**

```json
[
  {
    "IDBienes": 2001,
    "IDAsegurado": 1001,
    "Descripcion": "Casa de ladrillo en buen estado"
  }
]
```

---

### Prueba 9: GET - Listar Casos

**Con cURL:**

```bash
curl http://localhost:3000/api/casos
```

**Respuesta esperada:**

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

---

### Prueba 10: POST - Crear Asegurado por API

**Con cURL:**

```bash
curl -X POST http://localhost:3000/api/asegurados \
  -H "Content-Type: application/json" \
  -d '{
    "IDAsegurado": 1002,
    "Nombre": "María",
    "ApellidoMaterno": "López",
    "ApellidoPaterno": "Rodríguez",
    "Rut": "98.765.432",
    "Dv": "5"
  }'
```

**Respuesta esperada:**

```json
{
  "mensaje": "Asegurado creado exitosamente"
}
```

---

## 3. PRUEBAS DE VALIDACIÓN

### Prueba 11: Validar Campos Requeridos

**Pasos:**

1. En formulario de Asegurados, dejar un campo vacío
2. Intentar enviar
3. El navegador debe mostrar un mensaje de validación

**Resultado esperado:** ✅ Formulario valida campos antes de enviar

---

### Prueba 12: Validar Manejo de Errores

**Pasos:**

1. En formulario de Bien, usar un ID Asegurado que no existe: `9999`
2. Enviar el formulario
3. Debe aparecer un mensaje rojo de error o simplemente se registra

**Resultado esperado:** ✅ Sistema maneja el error apropiadamente

---

## 4. PRUEBAS DE FUNCIONALIDAD

### Prueba 13: Navegación entre Pestañas

**Pasos:**

1. Hacer clic en cada botón del menú superior
2. Verificar que la sección correspondiente se muestra
3. Verificar que las otras secciones se ocultan

**Resultado esperado:** ✅ Navegación funciona correctamente

---

### Prueba 14: Limpieza de Formularios

**Pasos:**

1. Llenar un formulario completo
2. Enviar (debe mostrar éxito)
3. Verificar que el formulario se limpió

**Resultado esperado:** ✅ Formulario se vacía después de enviar

---

### Prueba 15: Actualización de Listados

**Pasos:**

1. Registrar un nuevo asegurado
2. Ir a otra pestaña
3. Volver a pestaña de Asegurados
4. El nuevo asegurado debe estar en la lista

**Resultado esperado:** ✅ Listado se actualiza automáticamente

---

## 5. PRUEBAS DE CONEXIÓN

### Prueba 16: Conexión a Azure SQL

**Verificar en consola del navegador (F12):**

- No debe haber errores de conexión
- Los datos deben cargarse sin problemas

**En consola del servidor (npm start):**

- Debe mostrarse: "Conexión a Azure SQL establecida"

**Resultado esperado:** ✅ Conexión exitosa a BD

---

### Prueba 17: Respuesta del Servidor

**Pasos:**

1. Abrir DevTools (F12)
2. Ir a pestaña "Network"
3. Registrar un asegurado
4. Verificar que la petición POST tiene estado 201
5. La respuesta debe incluir: `{"mensaje": "Asegurado creado exitosamente"}`

**Resultado esperado:** ✅ Servidor responde correctamente

---

## 6. PRUEBAS DE DATOS

### Datos de Prueba Recomendados

**Asegurado 1:**

- ID: 1001
- Nombre: Juan
- Apellido Materno: Pérez
- Apellido Paterno: García
- RUT: 12.345.678
- DV: K

**Asegurado 2:**

- ID: 1002
- Nombre: María
- Apellido Materno: López
- Apellido Paterno: Rodríguez
- RUT: 98.765.432
- DV: 5

**Bien 1:**

- ID: 2001
- ID Asegurado: 1001
- Descripción: Casa de ladrillo

**Bien 2:**

- ID: 2002
- ID Asegurado: 1002
- Descripción: Departamento

**Recinto 1:**

- ID: 3001
- ID Bien: 2001
- Dirección: Calle Principal 123

**Recinto 2:**

- ID: 3002
- ID Bien: 2002
- Dirección: Avenida Central 456

**Daño 1:**

- ID: 4001
- ID Recinto: 3001
- Descripción: Grietas en paredes

**Daño 2:**

- ID: 4002
- ID Recinto: 3002
- Descripción: Vidrio roto

**Caso 1:**

- ID: 5001
- ID Compañía: 1
- ID Asegurado: 1001

**Caso 2:**

- ID: 5002
- ID Compañía: 1
- ID Asegurado: 1002

---

## 7. CHECKLIST DE VERIFICACIÓN FINAL

- [ ] Servidor inicia correctamente
- [ ] Conexión a Azure SQL establecida
- [ ] Se cargan las páginas sin errores
- [ ] Todos los formularios se envían correctamente
- [ ] Los listados se actualizan
- [ ] Los mensajes de éxito/error aparecen
- [ ] La navegación entre pestañas funciona
- [ ] Los datos se guardan en la BD
- [ ] Se pueden recuperar los datos con GET
- [ ] No hay errores en consola del navegador

---

## 8. HERRAMIENTAS RECOMENDADAS PARA TESTING

### Postman

- Descargar: https://www.postman.com/downloads/
- Usar para probar endpoints individuales
- Guardar colecciones de pruebas

### Insomnia

- Descargar: https://insomnia.rest/
- Alternativa a Postman
- Interfaz limpia

### DevTools del Navegador (F12)

- Network: Ver peticiones HTTP
- Console: Ver errores JavaScript
- Application: Ver localStorage/cookies

### SQL Server Management Studio

- Consultar datos directamente en BD
- Verificar que se guardan correctamente

---

## Contacto y Soporte

Si encuentras problemas:

1. Revisar los logs en consola
2. Verificar conexión a BD
3. Consultar documentación en API_DOCS.md
4. Revisar CONFIGURACION.md para troubleshooting

---

**¡Feliz testing! 🚀**

_Proyecto de Titulación - Inspector Digital_
