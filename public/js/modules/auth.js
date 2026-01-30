/**
 * Módulo de autenticación
 * Maneja la verificación de sesión, cierre de sesión y gestión de usuarios
 */

import { API_URL, getAuthToken } from './api.js';

/**
 * Verifica la sesión del usuario actual
 * @returns {Promise<Object|null>} Usuario autenticado o null
 */
export async function verificarSesion() {
    const token = getAuthToken();
    
    if (!token) {
        if (!window.location.pathname.includes('login.html')) {
            window.location.replace('/login.html');
        }
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            mostrarUsuario(data.user);
            return data.user;
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (!window.location.pathname.includes('login.html')) {
                window.location.replace('/login.html');
            }
            return null;
        }
    } catch (error) {
        console.error('Error verificando sesión:', error);
        return null;
    }
}

/**
 * Muestra el nombre del usuario en el menú
 * @param {Object} user - Objeto de usuario
 */
export function mostrarUsuario(user) {
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    
    if (userMenu && userName) {
        userMenu.style.display = 'flex';
        userName.textContent = user.NombreCompleto || user.NombreUsuario || 'Usuario';
    }
}

/**
 * Cierra la sesión del usuario
 */
export async function cerrarSesion() {
    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    window.location.replace('/login.html');
}

/**
 * Inicializa el listener del botón de logout
 */
export function initAuthListeners() {
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', cerrarSesion);
    }
}
