# Guía de Diseño Responsivo - Inspector Digital

## Descripción General

La aplicación Inspector Digital implementa un diseño **100% responsivo** que se adapta automáticamente entre vista móvil y vista desktop, garantizando una experiencia óptima en cualquier dispositivo.

## Puntos de Quiebre (Breakpoints)

| Dispositivo       | Ancho Máximo   | Comportamiento                                        |
| ----------------- | -------------- | ----------------------------------------------------- |
| **Móvil**         | ≤ 1024px       | Sidebar lateral, menú hamburguesa, diseño móvil       |
| **Tablet/Hybrid** | 768px - 1024px | Ajuste de componentes, preparación desktop            |
| **Desktop**       | ≥ 1025px       | Pantalla completa, sin sidebar, navegación horizontal |

## Vista Móvil (≤ 1024px)

### Características:

- **Menú Hamburguesa**: Botón visible en header para abrir sidebar
- **Sidebar Lateral**: Menú desplegable desde la izquierda
- **Overlay**: Fondo oscuro que cierra el menú al hacer clic
- **Ancho de Contenedor**: 500px máximo
- **Padding Reducido**: Optimizado para pantallas pequeñas
- **Font Size**: Tamaños reducidos para mejor lectura

### Comportamiento del Menú Móvil:

1. **Abrir**: Clic en icono hamburguesa
2. **Cerrar Opciones**:
   - Clic en botón X (esquina superior derecha)
   - Clic en cualquier enlace del menú
   - Clic en overlay (fondo oscuro)

### Elementos Visibles:

```
┌──────────────────────────┐
│ ☰ INSPECCIÓN DIGITAL   ◀│  ← Header con menú hamburguesa
├──────────────────────────┤
│ ╔════════════════╗       │
│ ║   MENÚ        │       │
│ ║ - Acceso      │       │
│ ║ - Captura     │       │
│ ║ - Finalizar   │       │
│ ║ ────────────  │       │
│ ║ - Config      │       │
│ ║ - Ayuda       │       │
│ ╚════════════════╝       │
│                          │
│  FORMULARIO ACTUAL       │
│  ........................ │
│                          │
└──────────────────────────┘
```

## Vista Desktop (≥ 1025px)

### Características:

- **Sin Hamburguesa**: Menú hamburguesa oculto
- **Sin Sidebar**: Sidebar no se muestra
- **Ancho Máximo**: 1200px
- **Header Expandido**: Con título a la izquierda
- **Padding Aumentado**: Mayor espaciado para confort
- **Font Size**: Tamaños aumentados para mejor lectura

### Distribución Desktop:

```
┌────────────────────────────────────────────┐
│ INSPECCIÓN DIGITAL                         │
├────────────────────────────────────────────┤
│                                            │
│  CONTENIDO PRINCIPAL (max 1200px)         │
│  ..........................................  │
│  ............................................ │
│                                            │
└────────────────────────────────────────────┘
```

## Funcionalidad Responsiva del Menú

### JavaScript - Menu Toggle

```javascript
// Abrir menú
menuToggle.addEventListener("click", () => {
  sidebar.classList.add("active");
  sidebarOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Previene scroll
});

// Cerrar menú
closeMenu.addEventListener("click", () => {
  sidebar.classList.remove("active");
  sidebarOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Cerrar al hacer clic en overlay
sidebarOverlay.addEventListener("click", () => {
  // Mismo código de cierre
});

// Cerrar al hacer clic en un enlace
sidebarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Mismo código de cierre
  });
});
```

## CSS - Media Queries

### Puntos de Quiebre Principales:

#### 1. Vista Móvil (por defecto)

```css
.app-container {
  max-width: 500px;
  margin: 0 auto;
}

.sidebar {
  transform: translateX(-100%); /* Oculto por defecto */
}

.menu-toggle {
  display: flex; /* Visible en móvil */
}
```

#### 2. Tabla/Hybrid (768px)

```css
@media (min-width: 768px) {
  .form-row {
    grid-template-columns: 1fr 1fr; /* Dos columnas */
  }
}
```

#### 3. Desktop (1025px+)

```css
@media (min-width: 1025px) {
  .app-container {
    max-width: 1200px;
  }

  .menu-toggle {
    display: none; /* Oculto en desktop */
  }

  .sidebar {
    display: none; /* Completamente oculto */
  }

  .app-header h1 {
    font-size: 20px;
    text-align: left;
  }
}
```

## Elementos Responsivos Principales

### 1. Header

| Propiedad   | Móvil          | Desktop   |
| ----------- | -------------- | --------- |
| Height      | 44px (botones) | 60px      |
| Padding     | 16px 15px      | 20px 30px |
| H1 Size     | 16px           | 20px      |
| Hamburguesa | Visible        | Oculta    |

### 2. Container

| Propiedad  | Móvil   | Desktop |
| ---------- | ------- | ------- |
| Max Width  | 500px   | 1200px  |
| Margin     | 0 auto  | 0 auto  |
| Box Shadow | Visible | Ninguno |

### 3. Formularios

| Propiedad  | Móvil | Desktop         |
| ---------- | ----- | --------------- |
| Padding    | 20px  | 30px 40px       |
| Columns    | 1     | 2 (en form-row) |
| Input Size | 14px  | 15px            |

### 4. Fotos/Galerías

| Propiedad | Móvil | Desktop |
| --------- | ----- | ------- |
| Columnas  | 3     | 6       |
| Alto      | 100px | 140px   |

## Testing Responsivo

### Con DevTools de Navegador:

1. F12 o Ctrl+Shift+I (o Cmd+Option+I en Mac)
2. Click en "Responsive Design Mode" (Ctrl+Shift+M)
3. Seleccionar dispositivos predefinidos:
   - iPhone 12: 390 x 844px
   - iPad: 768 x 1024px
   - Desktop: 1920 x 1080px

### Puntos a Verificar:

- ✅ Menú hamburguesa visible ≤ 1024px
- ✅ Menú hamburguesa oculto ≥ 1025px
- ✅ Sidebar se desliza desde izquierda cuando está activo
- ✅ Overlay aparece cuando sidebar está abierto
- ✅ Cierre de menú funciona en todas las opciones
- ✅ Scroll se previene cuando menú está abierto
- ✅ Formularios se adaptan al ancho
- ✅ Fotos/Videos se adaptan al grid

## Flujo de Navegación Responsivo

### Paso 1: Acceso

```
Móvil: ☰ | INSPECCIÓN DIGITAL
Desktop: INSPECCIÓN DIGITAL

Formulario con campos:
- Número de Siniestro
- RUT
- RUT Asegurado
```

### Paso 2: Captura

```
Móvil: ☰ | INSPECCIÓN DIGITAL
Desktop: INSPECCIÓN DIGITAL

Formulario con:
- Tipo de Cobertura
- Descripción de Daños
- Medidas Métricas
- Galería de Fotos/Videos (responsive)
```

### Paso 3: Finalizar

```
Móvil: ☰ | INSPECCIÓN DIGITAL
Desktop: INSPECCIÓN DIGITAL

Resumen de:
- Información capturada
- Evidencia fotográfica
- Firma digital
```

## Transiciones y Animaciones

### Sidebar

- **Entrada**: `transform: translateX(0)` (300ms ease)
- **Salida**: `transform: translateX(-100%)` (300ms ease)

### Overlay

- **Opacity**: 0 → 1 (300ms ease)
- **Display**: hidden → visible

### Contenido

- **Slide In**: `translateY(10px)` → `translateY(0)` (300ms)

## Consideraciones de Rendimiento

### Mobile-First Approach:

- CSS base para móvil (archivo más ligero)
- Media queries agregan estilos adicionales para desktop
- Menor carga inicial en dispositivos móviles

### Optimizaciones:

- Hardware acceleration con `transform` y `transition`
- Scroll lock previene UI jank
- No hay layout thrashing con event listeners

## Compatibilidad de Navegadores

| Navegador     | Versión | Responsivo | Menú |
| ------------- | ------- | ---------- | ---- |
| Chrome        | 90+     | ✅         | ✅   |
| Firefox       | 88+     | ✅         | ✅   |
| Safari        | 14+     | ✅         | ✅   |
| Edge          | 90+     | ✅         | ✅   |
| Mobile Safari | iOS 14+ | ✅         | ✅   |
| Chrome Mobile | 90+     | ✅         | ✅   |

## Conclusiones

El diseño responsivo de Inspector Digital proporciona:

1. **Experiencia Óptima**: Cada dispositivo recibe una interfaz adaptada a su tamaño
2. **Navegación Intuitiva**: Menú contextual (hamburguesa en móvil, oculto en desktop)
3. **Rendimiento**: Optimizado con CSS-first y JavaScript mínimo
4. **Accesibilidad**: Scroll lock, overlays, transiciones suaves
5. **Mantenibilidad**: Media queries organizadas por breakpoint

---

**Última actualización**: 2024
**Versión**: 2.0 (Responsivo + Menú Funcional)
