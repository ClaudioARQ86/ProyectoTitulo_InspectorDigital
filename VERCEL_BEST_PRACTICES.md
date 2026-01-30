# 🎯 Mejores Prácticas para Vercel - Inspector Digital

## 📝 Variables de Entorno

### ⚠️ NUNCA subir al repositorio:

- ❌ `.env`
- ❌ Contraseñas en código
- ❌ Tokens o secrets hardcodeados

### ✅ Usar siempre:

- ✅ Variables de entorno de Vercel
- ✅ `.env.example` para referencia
- ✅ `process.env.VARIABLE_NAME` en el código

### Configuración en Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings > Environment Variables
3. Agrega cada variable:

```
NODE_ENV = production
JWT_SECRET = [genera un secret seguro]
DB_USER = creyes_alumnoiplacex
DB_PASSWORD = NuevaClave123
DB_SERVER = inspectordigital1.database.windows.net
DB_NAME = free-sql-db-2451406
COOKIE_SECRET = [genera un secret seguro]
```

### Generar Secrets Seguros:

```bash
# En tu terminal local:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🔄 Git Workflow

### Antes de cada commit:

```bash
# 1. Verificar que no haya archivos sensibles
git status

# 2. Verificar .gitignore
cat .gitignore

# 3. Commit
git add .
git commit -m "Descripción clara del cambio"
git push
```

### .gitignore debe incluir:

```
node_modules/
.env
.env.local
.env.production
npm-debug.log
yarn-error.log
.DS_Store
*.log
```

## 🚀 Despliegue Automático

Vercel redespliega automáticamente cuando:

- Haces push a la rama principal (main/master)
- Haces merge de un pull request

### Ramas:

- `main` ➜ Producción
- `develop` ➜ Preview
- `feature/*` ➜ Preview

## 📦 Optimización de Dependencias

### Solo incluir lo necesario:

```bash
# Instalar dependencias de producción
npm install <paquete> --save

# Instalar dependencias de desarrollo
npm install <paquete> --save-dev
```

### Verificar tamaño:

```bash
npm ls --depth=0
```

### Remover dependencias no usadas:

```bash
npm uninstall <paquete>
```

## 🎨 Archivos Estáticos

### Estructura recomendada:

```
public/
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── login.js
│   └── modules/
│       ├── api.js
│       ├── auth.js
│       ├── camera.js
│       ├── geolocation.js
│       └── ui.js
└── assets/
    ├── images/
    └── icons/
```

### Rutas en HTML:

```html
<!-- ✅ Correcto -->
<link rel="stylesheet" href="/css/style.css" />
<script src="/js/main.js"></script>

<!-- ❌ Incorrecto -->
<link rel="stylesheet" href="./css/style.css" />
<link rel="stylesheet" href="../css/style.css" />
```

## 🔍 Debugging

### Ver logs en tiempo real:

```bash
vercel logs --follow
```

### Ver logs de un deployment:

```bash
vercel logs [deployment-url]
```

### Errores comunes:

#### Error: Module not found

```bash
# Solución: Verificar package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

#### Error: Cannot connect to database

```bash
# Solución: Verificar variables de entorno
vercel env ls
vercel env pull
```

## 🧪 Testing Local antes de Deploy

### 1. Probar en modo producción local:

```bash
# Configurar NODE_ENV
export NODE_ENV=production  # Linux/Mac
$env:NODE_ENV="production"  # Windows PowerShell

# Iniciar servidor
npm start
```

### 2. Probar con variables de Vercel:

```bash
# Descargar variables de Vercel
vercel env pull .env.local

# Iniciar con variables de Vercel
npm start
```

### 3. Probar endpoints:

```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test API
curl http://localhost:3000/api
```

## 📊 Performance

### Optimizaciones:

1. **Minificar CSS/JS** (Vercel lo hace automáticamente)
2. **Comprimir imágenes**
3. **Lazy loading** para imágenes grandes
4. **Cache headers** para archivos estáticos

### Verificar performance:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Vercel Analytics (en el dashboard)

## 🔒 Seguridad

### Checklist de seguridad:

- [ ] Variables de entorno no expuestas
- [ ] HTTPS habilitado (automático en Vercel)
- [ ] JWT con secret seguro
- [ ] Contraseñas hasheadas con bcrypt
- [ ] Validación de inputs en el backend
- [ ] CORS configurado correctamente
- [ ] Rate limiting (si es necesario)

### Headers de seguridad:

Agregar en `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 📱 Progressive Web App (PWA)

### Para convertir en PWA:

1. Crear `manifest.json`
2. Agregar service worker
3. Agregar meta tags para mobile

## 🔄 CI/CD

### GitHub Actions (opcional):

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Analytics

Vercel proporciona analytics integrados:

- Visitas por página
- Tiempo de carga
- Ubicación geográfica
- Dispositivos

Actívalo en: Dashboard > Tu Proyecto > Analytics

## 🆘 Rollback

Si algo sale mal:

```bash
# Ver deployments
vercel ls

# Hacer rollback a un deployment anterior
vercel rollback [deployment-url]
```

O desde el dashboard:

1. Ve a Deployments
2. Selecciona el deployment anterior que funcionaba
3. Clic en "..." > "Promote to Production"

## 📝 Checklist Pre-Deploy

- [ ] Código testeado localmente
- [ ] Variables de entorno configuradas
- [ ] `.gitignore` actualizado
- [ ] Dependencias actualizadas
- [ ] Sin console.logs innecesarios
- [ ] Documentación actualizada
- [ ] README.md con instrucciones claras

## 🎯 Post-Deploy

- [ ] Verificar URL de producción
- [ ] Probar login
- [ ] Probar API endpoints
- [ ] Verificar logs sin errores
- [ ] Probar en diferentes dispositivos
- [ ] Probar en diferentes navegadores

---

**Última actualización:** Enero 2026
