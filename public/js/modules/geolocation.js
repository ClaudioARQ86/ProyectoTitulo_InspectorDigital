// Módulo de geolocalización
import { mostrarMensaje } from './ui.js';

let map = null;
let marker = null;

// Obtener ubicación del dispositivo
export function obtenerUbicacion() {
    const btnObtenerUbicacion = document.getElementById('btnObtenerUbicacion');
    if (btnObtenerUbicacion) {
        btnObtenerUbicacion.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Obteniendo ubicación...';
        btnObtenerUbicacion.disabled = true;
    }

    if (!navigator.geolocation) {
        mostrarMensaje('mensajePaso2', 'Tu navegador no soporta geolocalización', 'error');
        if (btnObtenerUbicacion) {
            btnObtenerUbicacion.innerHTML = '<i class="fas fa-map-marker-alt"></i> OBTENER UBICACIÓN GPS';
            btnObtenerUbicacion.disabled = false;
        }
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            // Actualizar campos ocultos
            document.getElementById('latitud').value = lat;
            document.getElementById('longitud').value = lng;

            // Mostrar información de ubicación
            const ubicacionInfo = document.getElementById('ubicacionInfo');
            if (ubicacionInfo) {
                ubicacionInfo.style.display = 'block';
                document.getElementById('ubicacionLatitud').textContent = lat.toFixed(6);
                document.getElementById('ubicacionLongitud').textContent = lng.toFixed(6);
                document.getElementById('ubicacionPrecision').textContent = Math.round(accuracy) + ' metros';
            }

            // Habilitar botón de ver mapa
            const btnVerMapa = document.getElementById('btnVerMapa');
            if (btnVerMapa) {
                btnVerMapa.disabled = false;
            }

            if (btnObtenerUbicacion) {
                btnObtenerUbicacion.innerHTML = '<i class="fas fa-check"></i> UBICACIÓN OBTENIDA';
                btnObtenerUbicacion.disabled = false;
                btnObtenerUbicacion.classList.add('btn-success');
            }

            mostrarMensaje('mensajePaso2', 'Ubicación obtenida correctamente', 'success');
        },
        (error) => {
            let mensaje = 'Error al obtener ubicación';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    mensaje = 'Permiso de ubicación denegado. Por favor, habilita los permisos de ubicación.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    mensaje = 'Información de ubicación no disponible';
                    break;
                case error.TIMEOUT:
                    mensaje = 'Tiempo de espera agotado al obtener ubicación';
                    break;
            }
            mostrarMensaje('mensajePaso2', mensaje, 'error');
            
            if (btnObtenerUbicacion) {
                btnObtenerUbicacion.innerHTML = '<i class="fas fa-map-marker-alt"></i> OBTENER UBICACIÓN GPS';
                btnObtenerUbicacion.disabled = false;
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Mostrar mapa con la ubicación
export function mostrarMapa() {
    const lat = parseFloat(document.getElementById('latitud').value);
    const lng = parseFloat(document.getElementById('longitud').value);

    if (!lat || !lng) {
        mostrarMensaje('mensajePaso2', 'Primero debes obtener la ubicación', 'error');
        return;
    }

    // Verificar que Google Maps esté disponible
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        mostrarMensaje('mensajePaso2', 'Error: Google Maps no está disponible. Verifica la configuración de la API key.', 'error');
        return;
    }

    // Mostrar modal del mapa
    const mapaModal = document.getElementById('mapaModal');
    if (mapaModal) {
        mapaModal.style.display = 'flex';
    }

    // Actualizar coordenadas en el modal
    document.getElementById('mapaLatitud').textContent = lat.toFixed(6);
    document.getElementById('mapaLongitud').textContent = lng.toFixed(6);

    // Inicializar mapa si no existe (con pequeño delay para asegurar que el modal se renderice)
    if (!map) {
        setTimeout(() => {
            try {
                initGoogleMap(lat, lng);
            } catch (error) {
                console.error('Error al inicializar mapa:', error);
                document.getElementById('mapa').innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column; color: #666;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px; color: #ff9800;"></i>
                        <h3>No se pudo cargar el mapa</h3>
                        <p>Verifica que la API key de Google Maps esté configurada correctamente.</p>
                        <p style="font-size: 12px; margin-top: 8px;">Consulta GOOGLE_MAPS_CONFIG.md para más información.</p>
                    </div>
                `;
            }
        }, 100);
    } else {
        // Actualizar posición del marcador
        const position = { lat, lng };
        map.setCenter(position);
        if (marker) {
            marker.setPosition(position);
        } else {
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: 'Ubicación de la inspección',
                animation: google.maps.Animation.DROP
            });
        }
    }
}

// Inicializar mapa de Google
function initGoogleMap(lat, lng) {
    const position = { lat, lng };
    
    map = new google.maps.Map(document.getElementById('mapa'), {
        center: position,
        zoom: 16,
        mapTypeId: 'roadmap',
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });

    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Ubicación de la inspección',
        animation: google.maps.Animation.DROP,
        draggable: false
    });

    // Agregar info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 8px;">
                <h4 style="margin: 0 0 8px 0;">Ubicación de Inspección</h4>
                <p style="margin: 0; font-size: 13px;">
                    <strong>Lat:</strong> ${lat.toFixed(6)}<br>
                    <strong>Lng:</strong> ${lng.toFixed(6)}
                </p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Cerrar modal del mapa
export function cerrarMapa() {
    const mapaModal = document.getElementById('mapaModal');
    if (mapaModal) {
        mapaModal.style.display = 'none';
    }
}

// Inicializar event listeners de geolocalización
export function initGeolocationListeners() {
    const btnObtenerUbicacion = document.getElementById('btnObtenerUbicacion');
    if (btnObtenerUbicacion) {
        btnObtenerUbicacion.addEventListener('click', obtenerUbicacion);
    }

    const btnVerMapa = document.getElementById('btnVerMapa');
    if (btnVerMapa) {
        btnVerMapa.addEventListener('click', mostrarMapa);
    }

    const btnCerrarMapa = document.getElementById('btnCerrarMapa');
    if (btnCerrarMapa) {
        btnCerrarMapa.addEventListener('click', cerrarMapa);
    }

    const btnCerrarMapaBtn = document.getElementById('btnCerrarMapaBtn');
    if (btnCerrarMapaBtn) {
        btnCerrarMapaBtn.addEventListener('click', cerrarMapa);
    }

    // Cerrar modal al hacer click fuera
    const mapaModal = document.getElementById('mapaModal');
    if (mapaModal) {
        mapaModal.addEventListener('click', (e) => {
            if (e.target === mapaModal) {
                cerrarMapa();
            }
        });
    }
}
