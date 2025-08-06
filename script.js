/****************************
 * FORM VALIDATION
 ****************************/
const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

// Custom validation function
function validateForm() {
    let isValid = true;
    
    // Reset previous error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });

    // Validate username
    if (usernameInput.value.trim() === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        isValid = false;
    } else if (usernameInput.value.trim().length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email';
        isValid = false;
    }

    // Validate password
    if (passwordInput.value === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    return isValid;
}

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        document.getElementById('resultsSection').classList.remove('hidden');
        
        // Display submitted data
        document.getElementById('userData').innerHTML = `
            <p><strong>Username:</strong> ${usernameInput.value}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
        `;
        
        // Reset form
        form.reset();
    }
});

/****************************
 * INTERACTIVE FEATURE 1: PASSWORD TOGGLE
 ****************************/
const togglePasswordBtn = document.getElementById('togglePassword');

togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Change eye icon
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

/****************************
 * INTERACTIVE FEATURE 2: THEME PICKER
 ****************************/
const themePicker = document.getElementById('themePicker');
const applyThemeBtn = document.getElementById('applyTheme');

applyThemeBtn.addEventListener('click', function() {
    const color = themePicker.value;
    
    // Change all buttons to the selected color
    document.querySelectorAll('button').forEach(button => {
        button.style.backgroundColor = color;
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = darkenColor(color, 20);
        });
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = color;
        });
    });
});

// Helper function to darken colors
function darkenColor(hex, percent) {
    // Convert hex to RGB
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // Darken each component
    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/****************************
 * BONUS FEATURE: CHARACTER COUNTER
 ****************************/
const messageBox = document.getElementById('messageBox');
const charCount = document.getElementById('charCount');

messageBox.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCount.textContent = currentLength;
    
    // Change color when approaching limit
    if (currentLength > 90) {
        charCount.style.color = currentLength >= 100 ? 'red' : 'orange';
    } else {
        charCount.style.color = 'inherit';
    }
});
