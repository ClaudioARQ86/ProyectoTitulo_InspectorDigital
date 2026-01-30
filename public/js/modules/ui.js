/**
 * Módulo de interfaz de usuario
 * Maneja sidebar, mensajes, navegación y elementos UI comunes
 */

/**
 * Inicializa el sidebar y sus controles
 */
export function initSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

    console.log('[UI] initSidebar - menuToggle found:', !!menuToggle, 'sidebar found:', !!sidebar);

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            console.log('[UI] menuToggle clicked');
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Muestra un mensaje en un elemento específico
 * @param {string} elementId - ID del elemento donde mostrar el mensaje
 * @param {string} mensaje - Texto del mensaje
 * @param {string} tipo - Tipo de mensaje ('success', 'error', 'info')
 */
export function mostrarMensaje(elementId, mensaje, tipo) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.className = `mensaje ${tipo}`;
        elemento.style.display = 'block';
        
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 5000);
    }
}

/**
 * Navega a un paso específico
 * @param {number} numeroPaso - Número del paso (1, 2, 3)
 */
export function irAPaso(numeroPaso) {
    window.location.href = `paso${numeroPaso}.html`;
}

/**
 * Inicializa el sistema de FAQ (preguntas frecuentes)
 */
export function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todas las preguntas
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir la pregunta clickeada si no estaba activa
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

/**
 * Actualiza el resumen de datos de inspección
 */
export function actualizarResumen() {
    const resumenInfo = document.getElementById('resumenInfo');
    if (!resumenInfo) return;

    const casoActual = JSON.parse(sessionStorage.getItem('casoActual') || '{}');
    const datosInspeccion = JSON.parse(sessionStorage.getItem('datosInspeccion') || '{}');

    if (Object.keys(casoActual).length === 0) {
        resumenInfo.innerHTML = '<p style="text-align: center; color: #999;">No hay datos disponibles</p>';
        return;
    }

    resumenInfo.innerHTML = `
        <div class="info-row">
            <span class="info-label">N° Siniestro:</span>
            <span class="info-value">${casoActual.NumeroSiniestro || 'N/A'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Asegurado:</span>
            <span class="info-value">${casoActual.nombreAsegurado || 'N/A'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Dirección:</span>
            <span class="info-value">${casoActual.direccionRecinto || 'N/A'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Compañía:</span>
            <span class="info-value">${casoActual.nombreCompania || 'N/A'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Cobertura:</span>
            <span class="info-value">${casoActual.descripcionCobertura || 'N/A'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Descripción:</span>
            <span class="info-value">${datosInspeccion.descripcion || 'N/A'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Superficie:</span>
            <span class="info-value">${datosInspeccion.superficie ? datosInspeccion.superficie + ' m²' : 'N/A'}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Volumen:</span>
            <span class="info-value">${datosInspeccion.volumen ? datosInspeccion.volumen + ' m³' : 'N/A'}</span>
        </div>
    `;
}
