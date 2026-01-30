# Configuración de Google Maps API

## Obtener API Key de Google Maps

Para usar la funcionalidad de geolocalización con mapa en la página de paso2.html, necesitas obtener una API key de Google Maps.

### Pasos para obtener la API key:

1. **Ir a Google Cloud Console**
   - Visita: https://console.cloud.google.com/

2. **Crear o seleccionar un proyecto**
   - Si no tienes un proyecto, crea uno nuevo
   - Dale un nombre descriptivo como "Inspector Digital"

3. **Habilitar la API de Google Maps**
   - Ve a "APIs y servicios" > "Biblioteca"
   - Busca "Maps JavaScript API"
   - Haz clic en "Habilitar"

4. **Crear credenciales**
   - Ve a "APIs y servicios" > "Credenciales"
   - Haz clic en "Crear credenciales" > "Clave de API"
   - Copia la clave generada

5. **Restringir la API key (Recomendado para producción)**
   - Haz clic en la clave creada
   - En "Restricciones de aplicación", selecciona "Referentes HTTP"
   - Agrega tu dominio: `*.tudominio.com/*`
   - En "Restricciones de API", selecciona "Maps JavaScript API"
   - Guarda los cambios

### Configurar la API key en el proyecto:

1. Abre el archivo: `views/paso2.html`

2. Busca la línea:

   ```html
   <script
     async
     defer
     src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=Function.prototype"
   ></script>
   ```

3. Reemplaza `YOUR_API_KEY` con tu clave real:
   ```html
   <script
     async
     defer
     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD...tu_clave_aqui&callback=Function.prototype"
   ></script>
   ```

## Funcionalidad de Geolocalización

### Características implementadas:

- ✅ Botón "OBTENER UBICACIÓN GPS" que captura las coordenadas del dispositivo
- ✅ Muestra latitud, longitud y precisión en metros
- ✅ Botón "Ver en Mapa" para visualizar la ubicación en Google Maps
- ✅ Modal interactivo con mapa que muestra la ubicación exacta
- ✅ Marcador en el mapa con información de coordenadas
- ✅ Las coordenadas se guardan automáticamente con la inspección

### Uso en la aplicación:

1. El usuario ingresa a Paso 2 (Captura de Datos)
2. Hace clic en "OBTENER UBICACIÓN GPS"
3. El navegador solicita permiso de ubicación
4. Se muestran las coordenadas y la precisión
5. Puede hacer clic en "Ver en Mapa" para ver la ubicación visualmente
6. Las coordenadas se envían junto con los demás datos del formulario

### Archivos modificados:

- `views/paso2.html` - Agregado UI de geolocalización y modal de mapa
- `public/js/modules/geolocation.js` - Nuevo módulo con lógica de geolocalización
- `public/js/main.js` - Importa y inicializa el módulo de geolocalización

## Notas importantes:

- 📱 La geolocalización funciona mejor en dispositivos móviles con GPS
- 🔒 Se requiere HTTPS para usar geolocalización en producción
- 💰 Google Maps API tiene cuota gratuita mensual ($200 USD de crédito)
- 🔑 Protege tu API key con restricciones de dominio en producción
- 📍 La precisión varía según el dispositivo (GPS vs WiFi/Cell towers)

## Pruebas en desarrollo local:

- En `localhost` la geolocalización funciona sin HTTPS
- Puedes probar con:
  - Chrome DevTools > Sensors > Location (simular ubicación)
  - Firefox Developer Tools > Web Developer > Responsive Design Mode > Location

## Costos de Google Maps API:

- Primeros $200 USD/mes: **GRATIS**
- Después: $7 USD por cada 1,000 cargas de mapa adicionales
- Para aplicaciones pequeñas, generalmente permanece gratis
