/**
 * Módulo de configuración de API
 * Contiene la URL base y constantes relacionadas con la API
 */

// Detectar entorno automáticamente
export const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : `${window.location.origin}/api`;

/**
 * Obtiene el token de autenticación del localStorage
 * @returns {string|null} Token JWT o null
 */
export function getAuthToken() {
    return localStorage.getItem('token');
}

/**
 * Obtiene los headers con autenticación
 * @returns {Object} Headers con Authorization Bearer token
 */
export function getAuthHeaders() {
    const token = getAuthToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

/**
 * Obtiene headers para FormData (sin Content-Type)
 * @returns {Object} Headers con Authorization Bearer token
 */
export function getAuthHeadersMultipart() {
    const token = getAuthToken();
    return {
        'Authorization': `Bearer ${token}`
    };
}
