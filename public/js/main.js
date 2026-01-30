/**
 * Inspector Digital - Aplicación Principal
 * Archivo principal que integra todos los módulos de la aplicación
 */

import { verificarSesion, cerrarSesion, initAuthListeners } from './modules/auth.js';
import { initSidebar, mostrarMensaje, irAPaso, initFAQ, actualizarResumen } from './modules/ui.js';
import { abrirCapturaCamara, cerrarCapturaCamara, capturarFoto, initCameraListeners } from './modules/camera.js';
import { obtenerUbicacion, mostrarMapa, cerrarMapa, initGeolocationListeners } from './modules/geolocation.js';

// Exportar funciones globales para uso en HTML inline (temporal - migrar a event listeners)
window.verificarSesion = verificarSesion;
window.cerrarSesion = cerrarSesion;
window.mostrarMensaje = mostrarMensaje;
window.irAPaso = irAPaso;
window.actualizarResumen = actualizarResumen;
window.abrirCapturaCamara = abrirCapturaCamara;
window.cerrarCapturaCamara = cerrarCapturaCamara;
window.capturarFoto = capturarFoto;
window.obtenerUbicacion = obtenerUbicacion;
window.mostrarMapa = mostrarMapa;
window.cerrarMapa = cerrarMapa;

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Inspector Digital...');
    
    // Verificar sesión solo si no estamos en login
    if (!window.location.pathname.includes('login.html')) {
        verificarSesion();
    }

    // Inicializar componentes UI
    initSidebar();
    initAuthListeners();
    initFAQ();
    
    // Inicializar funcionalidad de cámara si existe el modal
    if (document.getElementById('camaraModal')) {
        initCameraListeners();
    }
    
    // Inicializar funcionalidad de geolocalización si existe el botón
    if (document.getElementById('btnObtenerUbicacion')) {
        initGeolocationListeners();
    }
    
    console.log('✅ Inspector Digital inicializado correctamente');
});
