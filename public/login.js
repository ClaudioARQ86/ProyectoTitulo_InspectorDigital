// public/login.js
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const tabButtons = document.querySelectorAll('.tab-button');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginAlert = document.getElementById('loginAlert');
    const registerAlert = document.getElementById('registerAlert');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const registerPassword = document.getElementById('registerPassword');
    const passwordStrength = document.getElementById('passwordStrength');

    // Verificar si ya hay sesión activa
    checkSession();

    // Manejo de pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            // Cambiar clase activa de los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Mostrar/ocultar formularios
            if (tabName === 'login') {
                loginForm.classList.add('active');
                registerForm.classList.remove('active');
            } else {
                registerForm.classList.add('active');
                loginForm.classList.remove('active');
            }

            // Limpiar alertas
            hideAlert(loginAlert);
            hideAlert(registerAlert);
        });
    });

    // Toggle para mostrar/ocultar contraseñas
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);
            const icon = button.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Medidor de fortaleza de contraseña
    if (registerPassword) {
        registerPassword.addEventListener('input', (e) => {
            const password = e.target.value;
            updatePasswordStrength(password);
        });
    }

    // Manejo del formulario de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!username || !password) {
            showAlert(loginAlert, 'Por favor complete todos los campos', 'error');
            return;
        }

        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token si "recordarme" está activado
                if (rememberMe) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                }

                showAlert(loginAlert, 'Login exitoso. Redirigiendo...', 'success');
                
                // Redirigir a la página principal
                setTimeout(() => {
                    window.location.href = 'Index.html';
                }, 1500);
            } else {
                showAlert(loginAlert, data.error || 'Error al iniciar sesión', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert(loginAlert, 'Error de conexión. Intente nuevamente.', 'error');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
        }
    });

    // Manejo del formulario de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('registerName').value.trim();
        const username = document.getElementById('registerUsername').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validaciones
        if (!fullName || !username || !email || !password || !confirmPassword) {
            showAlert(registerAlert, 'Por favor complete todos los campos', 'error');
            return;
        }

        if (password.length < 6) {
            showAlert(registerAlert, 'La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showAlert(registerAlert, 'Las contraseñas no coinciden', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showAlert(registerAlert, 'Por favor ingrese un email válido', 'error');
            return;
        }

        const submitButton = registerForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                showAlert(registerAlert, 'Registro exitoso. Cambiando a login...', 'success');
                
                // Limpiar formulario
                registerForm.reset();
                passwordStrength.className = 'password-strength';
                
                // Cambiar a pestaña de login después de 2 segundos
                setTimeout(() => {
                    document.querySelector('[data-tab="login"]').click();
                    showAlert(loginAlert, 'Ya puede iniciar sesión con sus credenciales', 'info');
                }, 2000);
            } else {
                showAlert(registerAlert, data.error || 'Error al registrar usuario', 'error');
            }

            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-user-plus"></i> Registrarse';
        } catch (error) {
            console.error('Error:', error);
            showAlert(registerAlert, 'Error de conexión. Intente nuevamente.', 'error');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-user-plus"></i> Registrarse';
        }
    });

    // Funciones auxiliares
    function showAlert(alertElement, message, type) {
        alertElement.textContent = message;
        alertElement.className = `alert ${type}`;
        alertElement.style.display = 'flex';
    }

    function hideAlert(alertElement) {
        alertElement.style.display = 'none';
    }

    function updatePasswordStrength(password) {
        if (password.length === 0) {
            passwordStrength.className = 'password-strength';
            return;
        }

        let strength = 0;

        // Criterios de fortaleza
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) {
            passwordStrength.className = 'password-strength weak';
        } else if (strength <= 3) {
            passwordStrength.className = 'password-strength medium';
        } else {
            passwordStrength.className = 'password-strength strong';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function checkSession() {
        const token = localStorage.getItem('token');
        
        if (token) {
            try {
                const response = await fetch('/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    // Ya hay una sesión activa, redirigir
                    window.location.href = 'Index.html';
                } else {
                    // Token inválido, limpiarlo
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Error verificando sesión:', error);
            }
        }
    }
});
