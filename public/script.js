// API Base URL
const API_URL = 'http://localhost:3000/api';

// Variables globales para el flujo
let datosInspeccion = {
    siniestro: '',
    cobertura: '',
    descripcion: '',
    fotos: [],
    firma: ''
};

// ===== MENU LATERAL RESPONSIVO =====
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

    // Abrir menú
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Cerrar menú (botón X)
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Cerrar menú (overlay)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Cerrar menú al hacer clic en un enlace
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
});

// ===== NAVEGACIÓN DE PASOS =====
function irAPaso(numeroPaso) {
    // Ocultar todos los pasos y secciones
    document.querySelectorAll('.paso-section').forEach(paso => {
        paso.classList.remove('active');
    });
    
    // Mostrar paso o sección solicitada
    let elemento;
    if (typeof numeroPaso === 'string') {
        // Es una sección (about, config, help)
        elemento = document.getElementById(numeroPaso);
    } else {
        // Es un número de paso
        elemento = document.getElementById(`paso${numeroPaso}`);
    }
    
    if (elemento) {
        elemento.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// ===== PASO 1: ACCESO =====
document.getElementById('accesoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const numero_siniestro = document.getElementById('numero_siniestro').value;
    const rut = document.getElementById('rut').value;
    const rut_asegurado = document.getElementById('rut_asegurado').value;
    
    if (!numero_siniestro || !rut || !rut_asegurado) {
        mostrarMensaje('mensaje', 'Por favor completa todos los campos', 'error');
        return;
    }
    
    datosInspeccion.siniestro = numero_siniestro;
    
    mostrarMensaje('mensaje', '✓ Datos validados correctamente', 'success');
    setTimeout(() => {
        irAPaso(2);
    }, 1000);
});

// ===== PASO 2: CAPTURA =====
document.getElementById('capturaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const tipo_cobertura = document.getElementById('tipo_cobertura').value;
    const descripcion_danos = document.getElementById('descripcion_danos').value;
    const volumen = document.getElementById('volumen').value;
    
    if (!tipo_cobertura || !descripcion_danos) {
        mostrarMensaje('mensajePaso2', 'Por favor completa los campos requeridos', 'error');
        return;
    }
    
    datosInspeccion.cobertura = tipo_cobertura;
    datosInspeccion.descripcion = descripcion_danos;
    
    mostrarMensaje('mensajePaso2', '✓ Datos capturados correctamente', 'success');
    setTimeout(() => {
        actualizarResumen();
        irAPaso(3);
    }, 1000);
});

// ===== PASO 3: FINALIZAR =====
document.getElementById('finalizarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const confirmar = document.getElementById('confirmar_veracidad').checked;
    
    if (!confirmar) {
        mostrarMensaje('mensajePaso3', 'Debes confirmar la veracidad de la información', 'error');
        return;
    }
    
    // Enviar datos a la API
    try {
        const datos = {
            IDCaso: Math.floor(Math.random() * 10000),
            IDCompania: 1,
            IDAsegurado: 1001,
            descripcion: datosInspeccion.descripcion,
            tipo_cobertura: datosInspeccion.cobertura
        };
        
        const response = await fetch(`${API_URL}/casos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        
        if (response.ok) {
            mostrarMensaje('mensajePaso3', '✓ Inspección sincronizada correctamente', 'success');
            setTimeout(() => {
                // Resetear formularios y volver al paso 1
                document.getElementById('accesoForm').reset();
                document.getElementById('capturaForm').reset();
                datosInspeccion = { siniestro: '', cobertura: '', descripcion: '', fotos: [], firma: '' };
                irAPaso(1);
            }, 2000);
        } else {
            const error = await response.json();
            mostrarMensaje('mensajePaso3', '✗ Error: ' + error.error, 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajePaso3', '✗ Error de conexión: ' + error.message, 'error');
    }
});

// ===== FUNCIONES AUXILIARES =====
function mostrarMensaje(elementId, mensaje, tipo) {
    const div = document.getElementById(elementId);
    div.textContent = mensaje;
    div.className = `mensaje ${tipo}`;
    setTimeout(() => {
        div.className = 'mensaje';
    }, 5000);
}

function actualizarResumen() {
    document.getElementById('resumen_siniestro').textContent = datosInspeccion.siniestro || '-';
    document.getElementById('resumen_cobertura').textContent = datosInspeccion.cobertura || '-';
    document.getElementById('resumen_descripcion').textContent = datosInspeccion.descripcion || '-';
}

// ===== GESTIÓN DE FOTOS =====
document.getElementById('fotosInput').addEventListener('change', (e) => {
    const archivos = e.target.files;
    const preview = document.getElementById('fotosPreview');
    preview.innerHTML = '';
    
    for (let archivo of archivos) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            preview.appendChild(img);
            
            // Agregar también a la galería de finalizar
            const galeria = document.getElementById('galeria_fotos');
            const imgGaleria = document.createElement('img');
            imgGaleria.src = event.target.result;
            galeria.appendChild(imgGaleria);
        };
        reader.readAsDataURL(archivo);
    }
});

// ===== INTERACTIVIDAD DE SECCIONES ADICIONALES =====

// FAQ - Expandir/Contraer
(() => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Cerrar otros items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle del item actual
                item.classList.toggle('active');
            });
        }
    });
})();

// Sincronización
document.addEventListener('DOMContentLoaded', () => {
    const syncBtns = document.querySelectorAll('.config-group .btn-primary');
    
    syncBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Cambiar estado del botón
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sincronizando...';
            btn.disabled = true;
            
            // Simular sincronización
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                mostrarMensaje('sync-mensaje', '✓ Sincronización completada exitosamente', 'success');
                
                // Crear elemento de mensaje si no existe
                if (!document.getElementById('sync-mensaje')) {
                    const msg = document.createElement('div');
                    msg.id = 'sync-mensaje';
                    msg.className = 'mensaje success';
                    msg.textContent = '✓ Sincronización completada exitosamente';
                    btn.parentElement.appendChild(msg);
                }
            }, 2000);
        });
    });
});

// Formulario de reporte de bugs
document.addEventListener('DOMContentLoaded', () => {
    const bugForm = document.getElementById('bugForm');
    
    if (bugForm) {
        bugForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Crear mensaje
            let bugMsg = document.getElementById('bug-mensaje');
            if (!bugMsg) {
                bugMsg = document.createElement('div');
                bugMsg.id = 'bug-mensaje';
                bugMsg.className = 'mensaje success';
                bugForm.insertAdjacentElement('afterend', bugMsg);
            }
            
            bugMsg.textContent = '✓ Reporte enviado. Gracias por tu feedback';
            bugMsg.classList.add('success');
            bugForm.reset();
            
            setTimeout(() => {
                bugMsg.classList.remove('success');
            }, 3000);
        });
    }
});

// ===== INICIALIZAR =====
window.addEventListener('load', () => {
    irAPaso(1);
});