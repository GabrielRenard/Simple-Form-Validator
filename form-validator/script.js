const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// Functions

// Show input error message and outline
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show input success outline
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Validate email
const checkEmail = (input) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())) {
        showSuccess();
    } else {
        showError(input, 'Not a valid email')
    }
};

// Check required fields
const checkRequired = (inputArr) => {
    inputArr.forEach((item) => {
        if (item.value.trim() === '') {
            showError(item, `${getFieldName(item)} is required!`)
        } else {
            showSuccess(item);
        }
    })
};

// Check input length
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} should be minimum ${min} characters!`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} should be maximum ${max} characters!`)
    } else {
        showSuccess(input);
    }
};

const checkPassword = (a, b) => {
    if (a.value === b.value) {
        showSuccess();
    } else {
        showError(b, 'Passwords do not match');
    }
};

// Get field name
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPassword(password, password2)

});