# ✅ Checklist de Validación para Vercel

## 📋 Antes de Desplegar

- [x] `vercel.json` configurado correctamente
- [x] `api/index.js` actualizado para manejar rutas estáticas
- [x] `.env.example` creado con variables de ejemplo
- [x] `.vercelignore` creado
- [x] `package.json` con todas las dependencias necesarias
- [ ] Variables de entorno configuradas en Vercel Dashboard

## 🔍 Validaciones Post-Despliegue

### 1. Página Principal
- [ ] https://tu-proyecto.vercel.app/ ➜ Redirige a `/login.html`
- [ ] Aparece el formulario de login correctamente
- [ ] Los estilos CSS se cargan correctamente
- [ ] El logo/header se visualiza

### 2. Sistema de Login
- [ ] Formulario de login funciona
- [ ] Formulario de registro funciona
- [ ] Los mensajes de error aparecen correctamente
- [ ] Redirección después del login funciona
- [ ] Token JWT se guarda en localStorage

### 3. Navegación
- [ ] `/Index.html` - Página principal después del login
- [ ] `/paso1.html` - Búsqueda de casos
- [ ] `/paso2.html` - Inspección de casos
- [ ] `/paso3.html` - Resumen
- [ ] `/casos-inspeccionados.html` - Historial
- [ ] `/about.html` - Acerca de
- [ ] `/config.html` - Configuración
- [ ] `/help.html` - Ayuda

### 4. Archivos Estáticos
- [ ] `/css/style.css` se carga
- [ ] `/js/main.js` se carga
- [ ] `/js/login.js` se carga
- [ ] Módulos en `/js/modules/` funcionan
- [ ] Imágenes en `/assets/` se cargan

### 5. API Endpoints

#### Auth
- [ ] `POST /api/auth/register` - Registrar usuario
- [ ] `POST /api/auth/login` - Login
- [ ] `POST /api/auth/logout` - Logout
- [ ] `GET /api/auth/me` - Usuario actual

#### Casos
- [ ] `POST /api/casos/validar` - Validar acceso a caso
- [ ] `GET /api/casos/inspeccionados` - Casos inspeccionados
- [ ] `GET /api/casos/:id` - Obtener caso específico

#### Otros
- [ ] `GET /api/` - Info de la API

### 6. Base de Datos
- [ ] Conexión a Azure SQL funciona
- [ ] Queries se ejecutan correctamente
- [ ] Datos se recuperan sin errores
- [ ] Transacciones funcionan

### 7. Funcionalidades Específicas

#### Paso 1 - Búsqueda
- [ ] Formulario de búsqueda funciona
- [ ] Validación de campos funciona
- [ ] Búsqueda por ID de caso funciona (ej: 101)
- [ ] Validación de RUT funciona (ej: 16428250-3)
- [ ] Mensaje de éxito aparece
- [ ] Redirección a paso2 funciona

#### Paso 2 - Inspección
- [ ] Datos del caso se cargan desde sessionStorage
- [ ] Formulario de daños funciona
- [ ] Botón de cámara funciona (si aplica)
- [ ] Geolocalización funciona (si aplica)

#### Paso 3 - Resumen
- [ ] Resumen de datos se muestra correctamente
- [ ] Botón de enviar funciona
- [ ] Confirmación de envío aparece

### 8. Seguridad
- [ ] HTTPS habilitado (Vercel lo hace automáticamente)
- [ ] Variables de entorno no expuestas en el código
- [ ] JWT funciona correctamente
- [ ] Rutas protegidas redirigen al login

### 9. Performance
- [ ] Tiempos de carga aceptables (< 3s)
- [ ] Imágenes optimizadas
- [ ] Sin errores 404 en la consola
- [ ] Sin errores de CORS

### 10. Responsive
- [ ] Se visualiza correctamente en móvil
- [ ] Se visualiza correctamente en tablet
- [ ] Se visualiza correctamente en desktop
- [ ] Menú hamburguesa funciona

## 🧪 Comandos de Prueba

### Probar Login desde Terminal

```bash
curl -X POST https://tu-proyecto.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Probar Validación de Caso

```bash
curl -X POST https://tu-proyecto.vercel.app/api/casos/validar \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -d '{"idCaso":"101","rutAsegurado":"16428250-3"}'
```

### Probar API Info

```bash
curl https://tu-proyecto.vercel.app/api
```

## 🐛 Errores Comunes y Soluciones

### Error: "Module not found"
**Solución:** Verifica que la dependencia esté en `package.json`:
```bash
npm install <paquete> --save
git add package.json package-lock.json
git commit -m "Add missing dependency"
git push
```

### Error: "Cannot connect to database"
**Solución:** 
1. Verifica variables de entorno en Vercel
2. Verifica firewall de Azure SQL
3. Verifica credenciales

### Error: 404 en archivos estáticos
**Solución:**
1. Verifica que los archivos existan en el repositorio
2. Verifica rutas en `vercel.json`
3. Verifica configuración en `api/index.js`

### Error: "Invalid token"
**Solución:**
1. Verifica que JWT_SECRET esté configurado en Vercel
2. Limpia localStorage y vuelve a hacer login
3. Verifica que el token se esté enviando en headers

## 📊 Monitoreo Continuo

### Ver Logs
```bash
vercel logs --follow
```

### Ver Deployments
```bash
vercel ls
```

### Ver Analytics
Ve al dashboard de Vercel > Tu Proyecto > Analytics

## ✅ Estado Final

- [ ] Todas las validaciones pasaron
- [ ] Documentación actualizada
- [ ] README.md actualizado
- [ ] Variables de entorno configuradas
- [ ] URL de producción funcionando
- [ ] Sin errores en los logs

---

**Fecha de validación:** _____________  
**Validado por:** _____________  
**Notas adicionales:**

---

