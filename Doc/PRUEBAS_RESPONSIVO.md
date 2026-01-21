# Manual de Pruebas - Diseño Responsivo

## Requisitos Previos

1. Aplicación iniciada: `node app.js`
2. Navegador moderno (Chrome, Firefox, Safari, Edge)
3. DevTools abierto (F12 o Ctrl+Shift+I)

## Grupo 1: Pruebas de Menú Hamburguesa (≤ 1024px)

### Test 1.1: Menú Hamburguesa Visible

- **Paso**: Abrir DevTools en responsive mode (≤ 1024px)
- **Esperado**: Botón hamburguesa visible en header
- **Resultado**: ✓/✗

### Test 1.2: Abrir Menú

- **Paso**: Click en icono hamburguesa
- **Esperado**:
  - Sidebar se desliza desde izquierda
  - Overlay aparece
  - Scroll se bloquea (body overflow: hidden)
- **Resultado**: ✓/✗

### Test 1.3: Cerrar Menú (Botón X)

- **Paso**: Con menú abierto, click en botón X
- **Esperado**:
  - Sidebar regresa a posición inicial
  - Overlay desaparece
  - Scroll se restaura
- **Resultado**: ✓/✗

### Test 1.4: Cerrar Menú (Overlay)

- **Paso**: Con menú abierto, click en overlay
- **Esperado**: Menú se cierra (como Test 1.3)
- **Resultado**: ✓/✗

### Test 1.5: Cerrar Menú (Link Click)

- **Paso**: Con menú abierto, click en "Acceso", "Captura" o "Finalizar"
- **Esperado**:
  - Menú se cierra
  - Navega a paso correspondiente
- **Resultado**: ✓/✗

### Test 1.6: Animación Sidebar

- **Paso**: Abrir menú y observar movimiento
- **Esperado**: Transición suave de 300ms desde izquierda
- **Resultado**: ✓/✗

---

## Grupo 2: Pruebas de Vista Móvil (≤ 500px)

### Test 2.1: Ancho Máximo

- **Paso**: Cambiar tamaño a 500px
- **Esperado**: Container mantiene max-width: 500px, centrado
- **Resultado**: ✓/✗

### Test 2.2: Padding Reducido

- **Paso**: Observar espaciado en formulario
- **Esperado**: Padding: 20px (no más)
- **Resultado**: ✓/✗

### Test 2.3: Grid Columnas (Fotos)

- **Paso**: Scroll a Paso 2, ver galería de fotos
- **Esperado**: 3 columnas
- **Resultado**: ✓/✗

### Test 2.4: Font Size

- **Paso**: Inspeccionar elemento h1
- **Esperado**: font-size: 15px
- **Resultado**: ✓/✗

### Test 2.5: Botones Responsive

- **Paso**: Observar tamaño de botones
- **Esperado**: Padding: 14px 20px, font-size: 14px
- **Resultado**: ✓/✗

---

## Grupo 3: Pruebas de Vista Tablet (768px - 1024px)

### Test 3.1: Menú Hamburguesa Visible

- **Paso**: Cambiar tamaño a 768px
- **Esperado**: Botón hamburguesa aún visible
- **Resultado**: ✓/✗

### Test 3.2: Grid Fotos - 4 Columnas

- **Paso**: Scroll a Paso 2, ver galería
- **Esperado**: 4 columnas en lugar de 3
- **Resultado**: ✓/✗

### Test 3.3: Form Row - 2 Columnas

- **Paso**: Observar campos de "Medidas Métricas"
- **Esperado**: Si hay varios, mostrar 2 por fila
- **Resultado**: ✓/✗

### Test 3.4: Alto Fotos Ajustado

- **Paso**: Inspeccionar imagen en galería
- **Esperado**: height: 120px (no 100px como móvil)
- **Resultado**: ✓/✗

---

## Grupo 4: Pruebas de Vista Desktop (≥ 1025px)

### Test 4.1: Menú Hamburguesa Oculto

- **Paso**: Cambiar tamaño a 1200px
- **Esperado**: Botón hamburguesa desaparece
- **Resultado**: ✓/✗

### Test 4.2: Sidebar Oculto

- **Paso**: Presionar F12, ir a 1200px
- **Esperado**: Sidebar completamente oculto (display: none)
- **Resultado**: ✓/✗

### Test 4.3: Ancho Máximo 1200px

- **Paso**: Observar ancho del container
- **Esperado**: max-width: 1200px
- **Resultado**: ✓/✗

### Test 4.4: Header Expandido

- **Paso**: Observar título en header
- **Esperado**:
  - font-size: 20px
  - text-align: left
  - padding: 0 20px
- **Resultado**: ✓/✗

### Test 4.5: Padding Aumentado

- **Paso**: Inspeccionar .tab-content
- **Esperado**: padding: 30px 40px
- **Resultado**: ✓/✗

### Test 4.6: Grid Fotos - 6 Columnas

- **Paso**: Scroll a Paso 2
- **Esperado**: 6 columnas en lugar de 3
- **Resultado**: ✓/✗

### Test 4.7: Alto Fotos Máximo

- **Paso**: Inspeccionar imagen
- **Esperado**: height: 140px
- **Resultado**: ✓/✗

### Test 4.8: Font Size Aumentado

- **Paso**: Inspeccionar input
- **Esperado**: font-size: 15px
- **Resultado**: ✓/✗

### Test 4.9: Botones Más Grandes

- **Paso**: Inspeccionar botón
- **Esperado**: padding: 16px 24px, font-size: 15px
- **Resultado**: ✓/✗

---

## Grupo 5: Pruebas de Transición

### Test 5.1: 500px → 768px

- **Paso**: Usar DevTools para redimensionar lentamente
- **Esperado**: Cambios suaves sin saltos
- **Resultado**: ✓/✗

### Test 5.2: 1024px → 1025px

- **Paso**: Redimensionar a través del breakpoint
- **Esperado**:
  - Menú hamburguesa desaparece
  - Sidebar se oculta
  - Ancho máximo cambia
- **Resultado**: ✓/✗

### Test 5.3: 1200px → 500px (Completa)

- **Paso**: Hacer redimensionamiento completo
- **Esperado**: Todas las transiciones funcionan
- **Resultado**: ✓/✗

---

## Grupo 6: Pruebas de Navegación

### Test 6.1: Paso 1 → Paso 2

- **Paso**: Llenar Paso 1 y enviar
- **Esperado**: Navega a Paso 2, menú permanece cerrado
- **Resultado**: ✓/✗

### Test 6.2: Menú → Paso 3 (Móvil)

- **Paso**: En móvil, abrir menú, click "Finalizar"
- **Esperado**:
  - Navega a Paso 3
  - Menú se cierra automáticamente
- **Resultado**: ✓/✗

### Test 6.3: Link Menú → Paso 1 (Desde Paso 3)

- **Paso**: En Paso 3, menú hamburguesa, click "Acceso"
- **Esperado**: Navega a Paso 1 (recarga formulario)
- **Resultado**: ✓/✗

### Test 6.4: Scroll al Cambiar Paso

- **Paso**: Scroll hacia abajo, cambiar paso
- **Esperado**: Vuelve al top automáticamente
- **Resultado**: ✓/✗

---

## Grupo 7: Pruebas de Funcionalidad de Formulario

### Test 7.1: Validación Paso 1

- **Paso**: Dejar campos vacíos, enviar
- **Esperado**: Mensaje de error
- **Resultado**: ✓/✗

### Test 7.2: Adjuntar Fotos (Móvil)

- **Paso**: En móvil, Paso 2, botón "Adjuntar Fotos"
- **Esperado**: Abre selector de archivos
- **Resultado**: ✓/✗

### Test 7.3: Fotos en Galería

- **Paso**: Adjuntar fotos, ver galería
- **Esperado**: Fotos se muestran en grid responsivo
- **Resultado**: ✓/✗

### Test 7.4: Resumen en Paso 3

- **Paso**: Completar Paso 1 y Paso 2, ir a Paso 3
- **Esperado**: Se muestra información capturada
- **Resultado**: ✓/✗

---

## Grupo 8: Pruebas en Dispositivos Reales

### Test 8.1: iPhone (390px)

- **Dispositivo**: iPhone 12
- **Esperado**: Todo funciona correctamente
- **Resultado**: ✓/✗

### Test 8.2: iPad (768px)

- **Dispositivo**: iPad Pro
- **Esperado**: Todo funciona correctamente
- **Resultado**: ✓/✗

### Test 8.3: Laptop (1920px)

- **Dispositivo**: Laptop 1920x1080
- **Esperado**: Todo funciona correctamente
- **Resultado**: ✓/✗

---

## Resumen de Pruebas

| Grupo               | Tests  | Pasados | Fallidos | Resultado |
| ------------------- | ------ | ------- | -------- | --------- |
| Menú Hamburguesa    | 6      | \_\_\_  | \_\_\_   | ✓/✗       |
| Vista Móvil         | 5      | \_\_\_  | \_\_\_   | ✓/✗       |
| Vista Tablet        | 4      | \_\_\_  | \_\_\_   | ✓/✗       |
| Vista Desktop       | 9      | \_\_\_  | \_\_\_   | ✓/✗       |
| Transiciones        | 3      | \_\_\_  | \_\_\_   | ✓/✗       |
| Navegación          | 4      | \_\_\_  | \_\_\_   | ✓/✗       |
| Funcionalidad       | 4      | \_\_\_  | \_\_\_   | ✓/✗       |
| Dispositivos Reales | 3      | \_\_\_  | \_\_\_   | ✓/✗       |
| **TOTAL**           | **38** | \_\_\_  | \_\_\_   | **✓/✗**   |

---

## Bugs Encontrados

### Bug #1

- **Descripción**:
- **Pasos para reproducir**:
- **Comportamiento esperado**:
- **Comportamiento actual**:
- **Severidad**: Alta/Media/Baja
- **Fecha**:

### Bug #2

- **Descripción**:
- **Pasos para reproducir**:
- **Comportamiento esperado**:
- **Comportamiento actual**:
- **Severidad**: Alta/Media/Baja
- **Fecha**:

---

## Notas Finales

- **Fecha de Prueba**: ******\_\_\_******
- **Probador**: ******\_\_\_******
- **Estado General**: ✓ Aprobado / ✗ Rechazado
- **Observaciones**:

---

**Última actualización**: 2024
**Versión**: 2.0 (Responsivo + Menú Funcional)
