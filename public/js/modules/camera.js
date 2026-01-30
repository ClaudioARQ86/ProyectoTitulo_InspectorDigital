/**
 * Módulo de funcionalidad de cámara
 * Maneja la captura de fotos desde la cámara web
 */

import { mostrarMensaje } from './ui.js';

// Variables globales de cámara
let streamActual = null;
let cameraReady = false;
let facingMode = 'environment'; // 'user' para frontal, 'environment' para trasera
let availableCameras = [];

/**
 * Abre el modal de captura de cámara e inicializa el stream
 */
export async function abrirCapturaCamara() {
    console.log('=== ABRIENDO MODAL DE CÁMARA ===');
    const modal = document.getElementById('camaraModal');
    const video = document.getElementById('videoCaptura');
    const errorMsg = document.getElementById('camaraErrorMsg');
    
    if (!modal) {
        console.error('Modal no encontrado');
        return;
    }
    
    if (!video) {
        console.error('Elemento video no encontrado');
        return;
    }
    
    modal.style.display = 'flex';
    errorMsg.style.display = 'none';
    cameraReady = false;
    
    console.log('Modal mostrado, solicitando acceso a cámara...');

    try {
        // Verificar soporte de API
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Tu navegador no soporta acceso a cámara');
        }

        // Enumerar cámaras disponibles
        const devices = await navigator.mediaDevices.enumerateDevices();
        availableCameras = devices.filter(device => device.kind === 'videoinput');
        console.log('Cámaras disponibles:', availableCameras.length);

        // Mostrar selector si hay múltiples cámaras
        if (availableCameras.length > 1) {
            mostrarSelectorCamara();
        }

        // Configuración mejorada con mejor calidad y brillo
        let constraints = {
            video: {
                facingMode: facingMode,
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                aspectRatio: { ideal: 16/9 }
            },
            audio: false
        };

        console.log('Solicitando cámara con constraints:', constraints);
        streamActual = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('✓ Stream obtenido:', streamActual);

        // Asignar stream al video
        video.srcObject = streamActual;
        console.log('✓ Stream asignado al video');
        
        // Forzar reproducción
        try {
            await video.play();
            cameraReady = true;
            console.log('✓ Video reproduciendo. Dimensiones:', video.videoWidth, 'x', video.videoHeight);
            
            // Si las dimensiones son 0, esperar un poco más
            if (video.videoWidth === 0 || video.videoHeight === 0) {
                console.warn('⚠ Dimensiones son 0, esperando...');
                setTimeout(() => {
                    console.log('Dimensiones después de espera:', video.videoWidth, 'x', video.videoHeight);
                    if (video.videoWidth > 0 && video.videoHeight > 0) {
                        cameraReady = true;
                    }
                }, 1000);
            }
        } catch (playError) {
            console.error('Error al reproducir video:', playError);
            mostrarErrorCamara('No se pudo iniciar la reproducción del video. Intenta nuevamente.');
            cerrarCapturaCamara();
            return;
        }

        // Timeout de seguridad
        setTimeout(() => {
            if (!cameraReady) {
                console.error('✗ Timeout: Cámara no lista en 8 segundos');
                mostrarErrorCamara('La cámara tardó demasiado en inicializarse. Intenta nuevamente.');
            } else {
                console.log('✓ Cámara verificada y lista');
            }
        }, 8000);

    } catch (error) {
        console.error('✗ Error al acceder a la cámara:', error);
        let mensajeError = 'No se pudo acceder a la cámara. ';
        
        if (error.name === 'NotAllowedError') {
            mensajeError += 'Permiso denegado. Verifica los permisos en Configuración > Privacidad > Cámara.';
        } else if (error.name === 'NotFoundError') {
            mensajeError += 'No se encontró cámara en tu dispositivo.';
        } else if (error.name === 'NotReadableError') {
            mensajeError += 'La cámara está siendo usada por otra aplicación. Ciérrala e intenta nuevamente.';
        } else if (error.name === 'OverconstrainedError') {
            mensajeError += 'Tu dispositivo no soporta la resolución requerida. Intenta nuevamente.';
        } else {
            mensajeError += error.message || 'Error desconocido.';
        }
        
        mostrarErrorCamara(mensajeError);
    }
}

/**
 * Cierra el modal de cámara y libera recursos
 */
export function cerrarCapturaCamara() {
    console.log('=== CERRANDO MODAL DE CÁMARA ===');
    const modal = document.getElementById('camaraModal');
    const video = document.getElementById('videoCaptura');
    
    if (streamActual) {
        try {
            console.log('Deteniendo tracks de la cámara...');
            streamActual.getTracks().forEach(track => {
                track.stop();
                console.log('✓ Track detenido:', track.kind);
            });
        } catch (e) {
            console.error('Error al detener tracks:', e);
        }
        streamActual = null;
        console.log('✓ Stream limpiado');
    }
    
    if (video) {
        video.srcObject = null;
        video.pause();
        console.log('✓ Video limpiado y pausado');
    }
    
    cameraReady = false;
    if (modal) {
        modal.style.display = 'none';
        console.log('✓ Modal ocultado');
    }
    console.log('=== MODAL CERRADO COMPLETAMENTE ===');
}

/**
 * Captura una foto desde el video de la cámara
 */
export async function capturarFoto() {
    const video = document.getElementById('videoCaptura');
    const canvas = document.getElementById('canvasCaptura');
    const ctx = canvas.getContext('2d');
    const fotosInput = document.getElementById('fotosInput');
    const fotosPreview = document.getElementById('fotosPreview');
    
    try {
        // Verificar que la cámara esté lista
        if (!cameraReady) {
            mostrarErrorCamara('La cámara aún no está lista. Espera un momento e intenta nuevamente.');
            return;
        }

        // Verificar que el video esté reproduciendo
        if (video.paused || video.ended) {
            mostrarErrorCamara('El video de la cámara se pausó. Cierra el modal y abre nuevamente.');
            cerrarCapturaCamara();
            return;
        }

        // Configurar canvas con dimensiones del video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Validar dimensiones
        if (canvas.width === 0 || canvas.height === 0) {
            console.error('Dimensiones inválidas:', canvas.width, 'x', canvas.height);
            mostrarErrorCamara('No se pudo obtener las dimensiones del video. Intenta nuevamente.');
            return;
        }

        // Verificar que el canvas tiene contexto válido
        if (!ctx) {
            mostrarErrorCamara('Error al acceder al canvas. Intenta nuevamente.');
            return;
        }

        // Dibujar frame actual del video en canvas
        try {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } catch (drawError) {
            console.error('Error al dibujar en canvas:', drawError);
            mostrarErrorCamara('Error al capturar el frame del video. Intenta nuevamente.');
            return;
        }

        // Convertir canvas a blob y agregarlo a fotosInput
        canvas.toBlob(blob => {
            if (!blob) {
                mostrarErrorCamara('Error al convertir la imagen. Intenta nuevamente.');
                return;
            }

            // Crear File desde el Blob
            const timestamp = new Date().getTime();
            const file = new File([blob], `foto_capturada_${timestamp}.jpg`, { type: 'image/jpeg' });
            
            // Crear DataTransfer para manipular files input
            const dataTransfer = new DataTransfer();
            
            // Agregar archivos existentes
            for (let i = 0; i < fotosInput.files.length; i++) {
                dataTransfer.items.add(fotosInput.files[i]);
            }
            
            // Agregar nueva foto
            dataTransfer.items.add(file);
            
            // Actualizar input con todos los archivos
            fotosInput.files = dataTransfer.files;

            // Mostrar preview de la foto capturada
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.style.position = 'relative';
                
                // Crear contenedor para la imagen y botón de eliminar
                const containerImg = document.createElement('div');
                containerImg.style.position = 'relative';
                containerImg.style.display = 'inline-block';
                containerImg.style.margin = '5px';
                
                const btnEliminar = document.createElement('button');
                btnEliminar.type = 'button';
                btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
                btnEliminar.style.position = 'absolute';
                btnEliminar.style.top = '-8px';
                btnEliminar.style.right = '-8px';
                btnEliminar.style.background = '#d32f2f';
                btnEliminar.style.color = 'white';
                btnEliminar.style.border = 'none';
                btnEliminar.style.borderRadius = '50%';
                btnEliminar.style.width = '28px';
                btnEliminar.style.height = '28px';
                btnEliminar.style.cursor = 'pointer';
                btnEliminar.style.display = 'flex';
                btnEliminar.style.alignItems = 'center';
                btnEliminar.style.justifyContent = 'center';
                btnEliminar.style.fontSize = '12px';
                
                btnEliminar.addEventListener('click', () => {
                    containerImg.remove();
                });
                
                containerImg.appendChild(img);
                containerImg.appendChild(btnEliminar);
                fotosPreview.appendChild(containerImg);
            };
            reader.readAsDataURL(file);

            // Mostrar mensaje de éxito
            const errorMsg = document.getElementById('camaraErrorMsg');
            errorMsg.textContent = '✓ Foto capturada correctamente';
            errorMsg.style.display = 'block';
            errorMsg.style.color = '#4caf50';
            errorMsg.style.background = '#e8f5e9';
            errorMsg.style.borderColor = '#4caf50';

            setTimeout(() => {
                errorMsg.style.display = 'none';
            }, 2000);

        }, 'image/jpeg', 0.95);

    } catch (error) {
        console.error('Error al capturar foto:', error);
        mostrarErrorCamara('Error al capturar la foto: ' + (error.message || 'Intenta nuevamente.'));
    }
}

/**
 * Muestra un mensaje de error en el modal de cámara
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarErrorCamara(mensaje) {
    const errorMsg = document.getElementById('camaraErrorMsg');
    if (errorMsg) {
        errorMsg.textContent = mensaje;
        errorMsg.style.display = 'block';
        errorMsg.style.color = '#d32f2f';
        errorMsg.style.background = '#ffebee';
        errorMsg.style.borderColor = '#ffcdd2';
    }
    console.error('Error de cámara:', mensaje);
}

/**
 * Muestra el selector de cámara (frontal/trasera)
 */
function mostrarSelectorCamara() {
    const modal = document.getElementById('camaraModal');
    if (!modal) return;

    let selectorExistente = document.getElementById('cameraSwitchBtn');
    if (selectorExistente) return;

    const switchBtn = document.createElement('button');
    switchBtn.id = 'cameraSwitchBtn';
    switchBtn.type = 'button';
    switchBtn.className = 'btn-camera-switch';
    switchBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Cambiar Cámara';
    switchBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; z-index: 10; background: rgba(0,0,0,0.7); color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;';
    
    switchBtn.addEventListener('click', async () => {
        facingMode = facingMode === 'user' ? 'environment' : 'user';
        cerrarCapturaCamara();
        setTimeout(() => abrirCapturaCamara(), 300);
    });

    const modalContent = modal.querySelector('.camera-modal-content');
    if (modalContent) {
        modalContent.style.position = 'relative';
        modalContent.insertBefore(switchBtn, modalContent.firstChild);
    }
}

// Bandera para evitar inicializar listeners múltiples veces
let listenersInitialized = false;

/**
 * Inicializa los event listeners del modal de cámara
 */
export function initCameraListeners() {
    // Evitar agregar listeners múltiples veces
    if (listenersInitialized) {
        return;
    }
    
    const camaraModal = document.getElementById('camaraModal');
    const btnCapturar = document.getElementById('btnCapturarFoto');
    const btnCancelar = document.getElementById('btnCancelarCamara');
    const btnCerrar = document.getElementById('btnCerrarCamara');

    if (camaraModal) {
        camaraModal.addEventListener('click', (e) => {
            if (e.target === camaraModal) {
                cerrarCapturaCamara();
            }
        });
    }

    if (btnCapturar) {
        btnCapturar.addEventListener('click', (e) => {
            e.preventDefault(); 
            capturarFoto();
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarCapturaCamara();
        });
    }

    if (btnCerrar) {
        btnCerrar.addEventListener('click', (e) => {
            e.preventDefault();
            cerrarCapturaCamara();
        });
    }
    
    listenersInitialized = true;
}
