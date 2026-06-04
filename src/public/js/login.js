// ==========================================
// LOGIN VALIDATION & FUNCTIONALITY
// ==========================================

// Form Validation
function validateLoginForm() {
    const memberNick = document.querySelector('.member-nick').value.trim();
    const memberPassword = document.querySelector('.member-password').value;

    // Validate Username
    if (!memberNick) {
        showError('Please enter your username!');
        return false;
    }

    if (memberNick.length < 3) {
        showError('Username must be at least 3 characters!');
        return false;
    }

    // Validate Password
    if (!memberPassword) {
        showError('Please enter your password!');
        return false;
    }

    if (memberPassword.length < 6) {
        showError('Password must be at least 6 characters!');
        return false;
    }

    // All validations passed
    return true;
}

// Show Error Message
function showError(message) {
    alert(message);
    // You can replace this with a custom modal or toast notification
}

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.querySelector('.member-password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Remember Me functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load saved username if "Remember Me" was checked
    const savedUsername = localStorage.getItem('rememberedUsername');
    const rememberCheckbox = document.querySelector('input[name="rememberMe"]');
    const usernameInput = document.querySelector('.member-nick');

    if (savedUsername) {
        usernameInput.value = savedUsername;
        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }
    }

    // Save username on form submit if "Remember Me" is checked
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (validateLoginForm()) {
                const rememberMe = rememberCheckbox ? rememberCheckbox.checked : false;
                const username = usernameInput.value.trim();

                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }

                // Show loading state
                const submitBtn = document.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.textContent = 'Logging in...';
                    submitBtn.disabled = true;
                }
            } else {
                e.preventDefault();
            }
        });
    }

    // Input animations
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Enter key to submit
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.click();
            }
        }
    });
});

// Caps Lock Warning
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.querySelector('.member-password');
    
    if (passwordInput) {
        passwordInput.addEventListener('keyup', function(e) {
            if (e.getModifierState && e.getModifierState('CapsLock')) {
                showCapsLockWarning(true);
            } else {
                showCapsLockWarning(false);
            }
        });
    }
});

function showCapsLockWarning(show) {
    let warning = document.getElementById('capsLockWarning');
    
    if (show) {
        if (!warning) {
            warning = document.createElement('div');
            warning.id = 'capsLockWarning';
            warning.style.cssText = `
                color: #f59e0b;
                font-size: 12px;
                margin-top: 5px;
                display: flex;
                align-items: center;
                gap: 5px;
            `;
            warning.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Caps Lock is on';
            
            const passwordGroup = document.querySelector('.member-password').closest('.form-group');
            if (passwordGroup) {
                passwordGroup.appendChild(warning);
            }
        }
    } else {
        if (warning) {
            warning.remove();
        }
    }
}

// Social Login (Placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.querySelector('i').classList.contains('fa-facebook-f') ? 'Facebook' :
                           this.querySelector('i').classList.contains('fa-google') ? 'Google' :
                           'LinkedIn';
            
            alert(`${platform} login is not implemented yet.`);
            // Here you would implement OAuth login
        });
    });
});