// ==========================================
// SIGNUP VALIDATION & FUNCTIONALITY
// ==========================================

// Form Validation
function validateSignupForm() {
    const memberNick = document.querySelector('.member-nick').value.trim();
    const memberPhone = document.querySelector('.member-phone').value.trim();
    const memberPassword = document.querySelector('.member-password').value;
    const confirmPassword = document.querySelector('.confirm-password').value;
    const memberImage = document.querySelector('.member-image').files[0];

    // Validate Username
    if (!memberNick) {
        alert('Please enter username!');
        return false;
    }

    if (memberNick.length < 3) {
        alert('Username must be at least 3 characters!');
        return false;
    }

    // Validate Phone
    if (!memberPhone) {
        alert('Please enter phone number!');
        return false;
    }

    // Phone number validation (basic)
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!phoneRegex.test(memberPhone.replace(/[\s\-\(\)]/g, ''))) {
        alert('Please enter a valid phone number!');
        return false;
    }

    // Validate Password
    if (!memberPassword) {
        alert('Please enter password!');
        return false;
    }

    if (memberPassword.length < 6) {
        alert('Password must be at least 6 characters!');
        return false;
    }

    // Validate Password Match
    if (memberPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }

    // Validate Image
    /* if (!memberImage) {
        alert('Please upload admin image!');
        return false;
    } */

    // Validate Image Format
    const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedFormats.includes(memberImage.type)) {
        alert('Only .jpg, .jpeg, and .png formats are allowed!');
        return false;
    }

    // Validate Image Size (Max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (memberImage.size > maxSize) {
        alert('Image size must be less than 5MB!');
        return false;
    }

    // All validations passed
    return true;
}

// Image Preview Function
function previewImage(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Validate format
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedFormats.includes(file.type)) {
            alert('Only .jpg, .jpeg, and .png formats are allowed!');
            input.value = '';
            return;
        }

        // Validate size
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('Image size must be less than 5MB!');
            input.value = '';
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            if (preview) {
                preview.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);

        // Update file name display
        const fileName = document.getElementById('fileName');
        if (fileName) {
            fileName.value = file.name;
        }
    }
}

// Real-time validation feedback
document.addEventListener('DOMContentLoaded', function() {
    // Password strength indicator
    const passwordInput = document.querySelector('.member-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 'Weak';
            let color = '#ef4444';

            if (password.length >= 8) {
                strength = 'Medium';
                color = '#f59e0b';
            }
            if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                strength = 'Strong';
                color = '#10b981';
            }

            // You can add a strength indicator element if needed
            // strengthIndicator.textContent = strength;
            // strengthIndicator.style.color = color;
        });
    }

    // Password match indicator
    const confirmPasswordInput = document.querySelector('.confirm-password');
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            const password = passwordInput.value;
            const confirmPassword = this.value;

            if (confirmPassword && password !== confirmPassword) {
                this.style.borderColor = '#ef4444';
            } else if (confirmPassword) {
                this.style.borderColor = '#10b981';
            }
        });
    }

    // Phone number formatting (optional)
    const phoneInput = document.querySelector('.member-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/[^0-9+\-\s\(\)]/g, '');
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
});

// Form submission animation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn && validateSignupForm()) {
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;
        }
    });
}