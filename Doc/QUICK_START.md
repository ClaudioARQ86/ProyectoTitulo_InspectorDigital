# Quick Start - Inspector Digital v2.0

## 🚀 Inicio Rápido

### 1. Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno (si es necesario)
# Copiar .env.example a .env
copy .env.example .env

# O en Linux/Mac:
cp .env.example .env
```

### 2. Iniciar la Aplicación

#### Opción A: Script Windows

```bash
INICIAR.bat
```

#### Opción B: Script Linux/Mac

```bash
./INICIAR.sh
```

#### Opción C: Comando Manual

```bash
node app.js
```

**Esperado:**

```
✓ Servidor iniciado en puerto 3000
✓ Inspector Digital - Listo en http://localhost:3000
```

### 3. Abrir en Navegador

```
http://localhost:3000
```

---

## 📱 Probar Diseño Responsivo

### Opción 1: DevTools (Recomendado)

1. **Abrir DevTools**: `F12` o `Ctrl+Shift+I`
2. **Activar Responsive**: `Ctrl+Shift+M`
3. **Seleccionar Dispositivo**:
   - iPhone 12: 390 x 844px (móvil)
   - iPad: 768 x 1024px (tablet)
   - Desktop: 1920 x 1080px (desktop)

### Opción 2: Redimensionar Ventana

1. Abrir DevTools (F12)
2. Ir a pantalla completa (F11)
3. Redimensionar ventana del navegador
4. Observar cambios en:
   - Ancho del contenedor
   - Visibilidad del menú hamburguesa
   - Grid de fotos
   - Padding y font-size

### Opción 3: Dispositivo Real

1. Conectar a red local
2. Encontrar IP: `ipconfig` (Windows) o `ifconfig` (Linux/Mac)
3. Abrir en móvil: `http://<IP>:3000`

---

## 🔍 Pruebas Rápidas

### Test 1: Menú Hamburguesa Móvil ✅

1. **DevTools** → Responsive Mode
2. **Tamaño**: iPhone 12 (390px)
3. **Verificar**:
   - ☰ Hamburguesa visible en header
   - Clic abre sidebar
   - Overlay aparece
   - Botón X cierra

```
Esperado:
☰ INSPECCIÓN DIGITAL
├─ Sidebar se desliza (izquierda)
├─ Overlay oscuro aparece
└─ Scroll bloqueado
```

### Test 2: Menú Hamburguesa Desktop ✗

1. **DevTools** → Responsive Mode
2. **Tamaño**: Desktop (1200px+)
3. **Verificar**:
   - ☰ Hamburguesa OCULTA
   - Sidebar NO visible
   - Ancho expandido (1200px)

```
Esperado:
INSPECCIÓN DIGITAL (sin hamburguesa)
├─ Contenedor máximo 1200px
└─ Padding aumentado
```

### Test 3: Grid Fotos Responsivo

1. **Paso 2**: Captura de Datos
2. **Móvil** (390px): 3 columnas
3. **Tablet** (768px): 4 columnas
4. **Desktop** (1200px): 6 columnas

```
Móvil:   [IMG] [IMG] [IMG]
Tablet:  [IMG] [IMG] [IMG] [IMG]
Desktop: [IMG] [IMG] [IMG] [IMG] [IMG] [IMG]
```

### Test 4: Navegación

1. **Paso 1**: Llenar Acceso (RUT, Número Siniestro, etc.)
2. **Botón**: INGRESAR
3. **Resultado**: Navega a Paso 2
4. **Menú**: Si móvil y está abierto, se cierra automáticamente

---

## 📊 Checklist de Funcionamiento

### Menú (Móvil ≤ 1024px)

- [ ] Menú hamburguesa visible
- [ ] Clic en hamburguesa abre sidebar
- [ ] Sidebar se desliza desde izquierda
- [ ] Overlay aparece
- [ ] Botón X cierra menú
- [ ] Clic en overlay cierra menú
- [ ] Clic en enlace (Acceso/Captura/Finalizar) cierra menú
- [ ] Scroll bloqueado cuando menú abierto
- [ ] Transición suave (300ms)

### Diseño (Mobile)

- [ ] Max-width 500px
- [ ] Menú hamburguesa visible
- [ ] Padding 20px
- [ ] Font-size h1: 16px
- [ ] Grid fotos: 3 columnas
- [ ] Botones responsive
- [ ] Formularios completos

### Diseño (Tablet)

- [ ] Max-width 500px (como móvil)
- [ ] Menú hamburguesa visible
- [ ] Grid fotos: 4 columnas
- [ ] Form-row: 2 columnas
- [ ] Transición suave al cambiar tamaño

### Diseño (Desktop)

- [ ] Max-width 1200px
- [ ] Menú hamburguesa OCULTO
- [ ] Sidebar OCULTO
- [ ] Padding 30px 40px
- [ ] Font-size h1: 20px
- [ ] Grid fotos: 6 columnas
- [ ] Botones más grandes

### Navegación

- [ ] Paso 1 → Paso 2 funciona
- [ ] Paso 2 → Paso 3 funciona
- [ ] Links menú navegan correctamente
- [ ] Scroll al top al cambiar paso
- [ ] Mensajes de validación funcionan

---

## 🎯 Problemas Comunes

### Problema 1: Menú no se abre

**Solución:**

- Verificar DevTools Console (F12 → Console)
- Ver si hay errores en script.js
- Verificar que `.menu-toggle`, `.sidebar`, `.sidebar-overlay` existan en HTML

### Problema 2: Scroll no se bloquea

**Solución:**

- Verificar en DevTools que `body.style.overflow = 'hidden'` se establece
- Comprobar CSS no tenga conflictos con overflow

### Problema 3: Sidebar no se desliza

**Solución:**

- Verificar en DevTools que clase `active` se agrega
- Comprobar que CSS tenga `transform: translateX(-100%)` inicial

### Problema 4: No es responsivo

**Solución:**

- Verificar viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Comprobar DevTools Responsive Mode está activado
- Limpiar caché: `Ctrl+F5` (Ctrl+Shift+R en Chrome)

### Problema 5: Estilos no aplican

**Solución:**

- Verificar ruta CSS: `<link rel="stylesheet" href="style.css">`
- Limpiar caché del navegador
- Hard refresh: `Ctrl+Shift+Delete`

---

## 📚 Documentación Importante

| Documento                   | Descripción              | Uso                |
| --------------------------- | ------------------------ | ------------------ |
| `Doc/RESPONSIVO.md`         | Guía completa responsivo | Entender diseño    |
| `Doc/PRUEBAS_RESPONSIVO.md` | 38 tests detallados      | Testing exhaustivo |
| `Doc/UPDATE_v2.md`          | Cambios v2.0             | Historial completo |
| `Doc/CONFIGURACION.md`      | Setup de variables env   | Configar BD        |
| `Doc/API_DOCS.md`           | Endpoints API            | Desarrollo backend |

---

## 🛠️ Herramientas Recomendadas

### Para Testing

- Chrome DevTools (F12)
- Firefox Developer Edition
- Safari Web Inspector (en Mac)

### Para Debugging

- VS Code con Live Server extension
- Chrome DevTools (Inspect Element)
- Network tab (ver API calls)

### Para Desarrollo

- VS Code
- Git
- Node.js v14+
- npm

---

## 💡 Consejos Pro

### 1. Testing Rápido

```javascript
// En Console (F12), testear menú:
document.querySelector(".menu-toggle").click(); // Abrir
document.querySelector(".close-menu").click(); // Cerrar
```

### 2. Verificar Breakpoint Actual

```javascript
// En Console:
console.log("Ancho actual:", window.innerWidth);
console.log("Es móvil:", window.innerWidth <= 1024);
console.log("Es desktop:", window.innerWidth >= 1025);
```

### 3. Forzar Redraw

```bash
# Limpiar caché completo
Ctrl+Shift+Delete
```

### 4. Modo Dark DevTools

- DevTools → Settings (⚙️) → Preferences → Theme: Dark

---

## 📞 Soporte

### Si encuentras problemas:

1. **Verificar Console**: F12 → Console (¿Hay errores?)
2. **Verificar Network**: F12 → Network (¿Se carga HTML/CSS/JS?)
3. **Verificar HTML**: F12 → Elements (¿Estructura correcta?)
4. **Ver PRUEBAS_RESPONSIVO.md**: Testing completo

### Contacto:

- Ver `Doc/INSTRUCCIONES.md`
- Revisar `README.md`

---

## ✅ Confirmación de Éxito

Si ves esto, **¡Todo funciona correctamente!** ✅

```
✓ Servidor en puerto 3000
✓ Página carga correctamente
✓ Menú hamburguesa visible en móvil
✓ Menú hamburguesa oculto en desktop
✓ Grid fotos se adapta
✓ Navegación entre pasos funciona
✓ Formularios responden
```

---

**Versión**: 2.0  
**Última actualización**: 2024-01-21  
**Status**: ✅ Listo para uso
