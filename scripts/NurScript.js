function validateCustomerForm(event) {
    event.preventDefault();
    
    let isValid = true;
    let errorMessages = [];
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const terms = document.getElementById('terms').checked;
    
    clearAllErrors();
    
    if (firstName === '') {
        isValid = false;
        errorMessages.push('First name is required');
        showFieldError('firstName', 'Please enter your first name');
    } else if (firstName.length < 2) {
        isValid = false;
        errorMessages.push('First name must be at least 2 characters');
        showFieldError('firstName', 'First name must be at least 2 characters');
    }
    
    if (lastName === '') {
        isValid = false;
        errorMessages.push('Last name is required');
        showFieldError('lastName', 'Please enter your last name');
    } else if (lastName.length < 2) {
        isValid = false;
        errorMessages.push('Last name must be at least 2 characters');
        showFieldError('lastName', 'Last name must be at least 2 characters');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        isValid = false;
        errorMessages.push('Email is required');
        showFieldError('email', 'Please enter your email address');
    } else if (!emailRegex.test(email)) {
        isValid = false;
        errorMessages.push('Invalid email format');
        showFieldError('email', 'Please enter a valid email (example@domain.com)');
    }
    
    const phoneRegex = /^\+?7\s?\(?\d{3}\)?\s?\d{3}-?\d{4}$/;
    if (phone === '') {
        isValid = false;
        errorMessages.push('Phone number is required');
        showFieldError('phone', 'Please enter your phone number');
    } else if (!phoneRegex.test(phone)) {
        isValid = false;
        errorMessages.push('Invalid phone format');
        showFieldError('phone', 'Format: +7 (XXX) XXX-XXXX');
    }
    
    if (!terms) {
        isValid = false;
        errorMessages.push('You must agree to terms and conditions');
        showFieldError('terms', 'Please accept the terms and conditions');
    }

    if (isValid) {
        alert('✅ Customer Information validated successfully!\n\nYou can proceed to payment.');
        showPaymentInfo();
        return true;
    } else {
        return false;
    }
}


function showPaymentInfo() {
    const paymentInfo = document.getElementById('payment-form');
    if (paymentInfo) {
        paymentInfo.style.display = 'block';
        paymentInfo.scrollIntoView({ behavior: 'smooth' });
    }
    
}

function validatePaymentForm(event) {
    event.preventDefault();
    
    let isValid = true;
    let errorMessages = [];
    
    clearAllErrors();
    
    const selectedMethod = document.querySelector('.payment-method.selected');
    
    if (!selectedMethod) {
        alert('❌ Please select a payment method');
        return false;
    }
    
    const methodType = getSelectedPaymentMethod();
    
    if (methodType === 'card') {
        isValid = validateCreditCard(errorMessages);
    } else if (methodType === 'kaspi') {
        isValid = validateKaspiQR(errorMessages);
    } else if (methodType === 'applepay') {
        isValid = validateApplePay(errorMessages);
    } else if (methodType === 'bank') {
        isValid = validateBankTransfer(errorMessages);
    }
    
    if (isValid) {
        setTimeout(function() {
            window.location.href = 'confirmation.html';
        }, 1500);
        return true;
    } else {
        return false;
    }
}


function validateCreditCard(errorMessages) {
    let isValid = true;
    
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiryDate = document.getElementById('expiryDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const cardName = document.getElementById('cardName').value.trim();
    
    const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    if (cardNumber === '') {
        isValid = false;
        errorMessages.push('Card number is required');
        showFieldError('cardNumber', 'Please enter your card number');
    } else if (!cardRegex.test(cardNumber)) {
        isValid = false;
        errorMessages.push('Invalid card number format');
        showFieldError('cardNumber', 'Enter 16 digits (e.g., 1234 5678 9012 3456)');
    }
    
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (expiryDate === '') {
        isValid = false;
        errorMessages.push('Expiry date is required');
        showFieldError('expiryDate', 'Required');
    } else if (!expiryRegex.test(expiryDate)) {
        isValid = false;
        errorMessages.push('Invalid expiry date format');
        showFieldError('expiryDate', 'Format: MM/YY');
    } else {
        const parts = expiryDate.split('/');
        const month = parseInt(parts[0]);
        const year = 2000 + parseInt(parts[1]);
        const now = new Date();
        const expiry = new Date(year, month - 1);
        
        if (expiry < now) {
            isValid = false;
            errorMessages.push('Card has expired');
            showFieldError('expiryDate', 'Card expired');
        }
    }
    
    const cvvRegex = /^\d{3,4}$/;
    if (cvv === '') {
        isValid = false;
        errorMessages.push('CVV is required');
        showFieldError('cvv', 'Required');
    } else if (!cvvRegex.test(cvv)) {
        isValid = false;
        errorMessages.push('Invalid CVV');
        showFieldError('cvv', '3-4 digits');
    }
    
    if (cardName === '') {
        isValid = false;
        errorMessages.push('Cardholder name is required');
        showFieldError('cardName', 'Enter name as on card');
    } else if (cardName.length < 3) {
        isValid = false;
        errorMessages.push('Cardholder name is too short');
        showFieldError('cardName', 'Enter full name');
    }
    
    return isValid;
}


function validateKaspiQR(errorMessages) {
    // Kaspi QR just needs confirmation
    alert('📱 Please scan the QR code with your Kaspi app to complete payment');
    return true;
}

function validateApplePay(errorMessages) {
    // Apple Pay just needs confirmation
    alert('🍎 Please authenticate with Touch ID or Face ID');
    return true;
}

function validateBankTransfer(errorMessages) {
    // Bank Transfer just needs confirmation
    alert('🏦 Please transfer to the account details shown and use the reference number');
    return true;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.style.borderColor = '#dc3545';
    field.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = '⚠ ' + message;
    
    if (field.parentElement) {
        field.parentElement.appendChild(errorDiv);
    }
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(msg) {
        msg.remove();
    });
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
}

function getSelectedPaymentMethod() {
    const selected = document.querySelector('.payment-method.selected');
    if (!selected) return null;
    
    // Get the onclick attribute to determine method type
    const onclickAttr = selected.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes("'card'")) return 'card';
    if (onclickAttr && onclickAttr.includes("'kaspi'")) return 'kaspi';
    
    if (onclickAttr && onclickAttr.includes("'applepay'")) return 'applepay';
    if (onclickAttr && onclickAttr.includes("'bank'")) return 'bank';
    
    return null;
}


function selectPaymentMethod(element, method) {
    // Remove 'selected' class from all payment methods
    const allMethods = document.querySelectorAll('.payment-method');
    allMethods.forEach(function(pm) {
        pm.classList.remove('selected');
    });
    
    // Add 'selected' class to clicked method
    element.classList.add('selected');
    
    // Hide all payment forms
    const cardForm = document.getElementById('cardPaymentForm');
    const kaspiForm = document.getElementById('kaspiPaymentForm');
    const appleForm = document.getElementById('applePayForm');
    const bankForm = document.getElementById('bankTransferForm');
    
    if (cardForm) cardForm.style.display = 'none';
    if (kaspiForm) kaspiForm.style.display = 'none';
    if (appleForm) appleForm.style.display = 'none';
    if (bankForm) bankForm.style.display = 'none';
    
    // Show selected payment form
    if (method === 'card' && cardForm) {
        cardForm.style.display = 'block';
    } else if (method === 'kaspi' && kaspiForm) {
        kaspiForm.style.display = 'block';
    } else if (method === 'applepay' && appleForm) {
        appleForm.style.display = 'block';
    } else if (method === 'bank' && bankForm) {
        bankForm.style.display = 'block';
    }
}


function attachCustomerFormListeners() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const terms = document.getElementById('terms');
    
    if (firstName) {
        firstName.addEventListener('blur', validateFirstName);
        firstName.addEventListener('input', function() {
            removeFieldError('firstName');
        });
    }
    
    if (lastName) {
        lastName.addEventListener('blur', validateLastName);
        lastName.addEventListener('input', function() {
            removeFieldError('lastName');
        });
    }
    
    if (email) {
        email.addEventListener('blur', validateEmail);
        email.addEventListener('input', function() {
            removeFieldError('email');
        });
    }
    
    if (phone) {
        phone.addEventListener('blur', validatePhone);
        phone.addEventListener('input', function() {
            removeFieldError('phone');
        });
    }
    
    if (terms) {
        terms.addEventListener('change', validateTerms);
    }
}

function validateFirstName() {
    const firstName = document.getElementById('firstName').value.trim();
    removeFieldError('firstName');
    
    if (firstName === '') {
        showFieldError('firstName', 'Please enter your first name');
        return false;
    }
    
    if (firstName.length < 2) {
        showFieldError('firstName', 'First name must be at least 2 characters');
        return false;
    }
    
    return true;
}

function validateLastName() {
    const lastName = document.getElementById('lastName').value.trim();
    removeFieldError('lastName');
    
    if (lastName === '') {
        showFieldError('lastName', 'Please enter your last name');
        return false;
    }
    
    if (lastName.length < 2) {
        showFieldError('lastName', 'Last name must be at least 2 characters');
        return false;
    }
    
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    removeFieldError('email');
    
    if (email === '') {
        showFieldError('email', 'Please enter your email address');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email (example@domain.com)');
        return false;
    }
    
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone').value.trim();
    removeFieldError('phone');
    
    if (phone === '') {
        showFieldError('phone', 'Please enter your phone number');
        return false;
    }
    
    const phoneRegex = /^\+?7\s?\(?\d{3}\)?\s?\d{3}-?\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showFieldError('phone', 'Format: +7 (XXX) XXX-XXXX');
        return false;
    }
    
    return true;
}

function validateTerms() {
    const terms = document.getElementById('terms').checked;
    removeFieldError('terms');
    
    if (!terms) {
        showFieldError('terms', 'Please accept the terms and conditions');
        return false;
    }
    
    return true;
}

function attachPaymentFormListeners() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('cardName');
    
    if (cardNumber) {
        cardNumber.addEventListener('blur', validateCardNumber);
        cardNumber.addEventListener('input', function() {
            removeFieldError('cardNumber');
        });
    }
    
    if (expiryDate) {
        expiryDate.addEventListener('blur', validateExpiryDate);
        expiryDate.addEventListener('input', function() {
            removeFieldError('expiryDate');
        });
    }
    
    if (cvv) {
        cvv.addEventListener('blur', validateCVV);
        cvv.addEventListener('input', function() {
            removeFieldError('cvv');
        });
    }
    
    if (cardName) {
        cardName.addEventListener('blur', validateCardName);
        cardName.addEventListener('input', function() {
            removeFieldError('cardName');
        });
    }
}

function validateCardNumber() {
    const cardNumber = document.getElementById('cardNumber').value.trim();
    removeFieldError('cardNumber');
    
    if (cardNumber === '') {
        showFieldError('cardNumber', 'Please enter your card number');
        return false;
    }
    
    const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    if (!cardRegex.test(cardNumber)) {
        showFieldError('cardNumber', 'Enter 16 digits (e.g., 1234 5678 9012 3456)');
        return false;
    }
    
    return true;
}

function validateExpiryDate() {
    const expiryDate = document.getElementById('expiryDate').value.trim();
    removeFieldError('expiryDate');
    
    if (expiryDate === '') {
        showFieldError('expiryDate', 'Required');
        return false;
    }
    
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
        showFieldError('expiryDate', 'Format: MM/YY');
        return false;
    }
    
    const parts = expiryDate.split('/');
    const month = parseInt(parts[0]);
    const year = 2000 + parseInt(parts[1]);
    const now = new Date();
    const expiry = new Date(year, month - 1);
    
    if (expiry < now) {
        showFieldError('expiryDate', 'Card expired');
        return false;
    }
    
    return true;
}

function validateCVV() {
    const cvv = document.getElementById('cvv').value.trim();
    removeFieldError('cvv');
    
    if (cvv === '') {
        showFieldError('cvv', 'Required');
        return false;
    }
    
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(cvv)) {
        showFieldError('cvv', '3-4 digits');
        return false;
    }
    
    return true;
}

function validateCardName() {
    const cardName = document.getElementById('cardName').value.trim();
    removeFieldError('cardName');
    
    if (cardName === '') {
        showFieldError('cardName', 'Enter name as on card');
        return false;
    }
    
    if (cardName.length < 3) {
        showFieldError('cardName', 'Enter full name');
        return false;
    }
    
    return true;
}

function removeFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

const customerFormElement = document.getElementById('customerForm');
if (customerFormElement) {
    customerFormElement.addEventListener('submit', validateCustomerForm);
    attachCustomerFormListeners();
}

const submitButton = document.querySelector('button[onclick="processPayment()"]');
if (submitButton) {
    submitButton.onclick = validatePaymentForm;
}

const cardPaymentForm = document.getElementById('cardPaymentForm');
if (cardPaymentForm) {
    attachPaymentFormListeners();
}
//task 2 accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
        toggleAccordion(this);
    });
});

function toggleAccordion(clickedHeader) {
    const accordionItem = clickedHeader.parentElement;
    
    const isActive = accordionItem.classList.contains('active');
    
    const allAccordionItems = document.querySelectorAll('.accordion-item');
    allAccordionItems.forEach(function(item) {
        item.classList.remove('active');
    });
    
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}
//task 3 popup
const popup = document.getElementById('subscriptionPopup');

function openPopup() {
    popup.classList.add('active');
    console.log('✅ Popup opened');
    attachPopupValidationListeners();
}

function closePopup() {
    popup.classList.remove('active');
    console.log('❌ Popup closed');
    clearAllErrors();
}

function attachPopupValidationListeners() {
    const popupName = document.getElementById('popupName');
    const popupEmail = document.getElementById('popupEmail');
    const popupPhone = document.getElementById('popupPhone');
    
    if (popupName) {
        popupName.removeEventListener('blur', validatePopupName);
        popupName.removeEventListener('input', clearPopupNameError);
        popupName.addEventListener('blur', validatePopupName);
        popupName.addEventListener('input', clearPopupNameError);
    }
    
    if (popupEmail) {
        popupEmail.removeEventListener('blur', validatePopupEmail);
        popupEmail.removeEventListener('input', clearPopupEmailError);
        popupEmail.addEventListener('blur', validatePopupEmail);
        popupEmail.addEventListener('input', clearPopupEmailError);
    }
    
    if (popupPhone) {
        popupPhone.removeEventListener('blur', validatePopupPhone);
        popupPhone.removeEventListener('input', clearPopupPhoneError);
        popupPhone.addEventListener('blur', validatePopupPhone);
        popupPhone.addEventListener('input', clearPopupPhoneError);
    }
}

function validatePopupName() {
    const name = document.getElementById('popupName').value.trim();
    removeFieldError('popupName');
    
    if (name === '') {
        showFieldError('popupName', 'Please enter your full name');
        return false;
    }
    
    if (name.length < 3) {
        showFieldError('popupName', 'Name must be at least 3 characters');
        return false;
    }
    
    if (!/^[a-zA-ZА-Яа-яЁё\s]+$/.test(name)) {
        showFieldError('popupName', 'Only letters and spaces allowed');
        return false;
    }
    
    return true;
}

function validatePopupEmail() {
    const email = document.getElementById('popupEmail').value.trim();
    removeFieldError('popupEmail');
    
    if (email === '') {
        showFieldError('popupEmail', 'Please enter your email address');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('popupEmail', 'Please enter a valid email (example@domain.com)');
        return false;
    }
    
    return true;
}

function validatePopupPhone() {
    const phone = document.getElementById('popupPhone').value.trim();
    removeFieldError('popupPhone');
    
    if (phone === '' || phone === undefined) {
        return true;
    }
    
    const phoneRegex = /^\+?7\s?\(?\d{3}\)?\s?\d{3}-?\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showFieldError('popupPhone', 'Format: +7 (XXX) XXX-XXXX');
        return false;
    }
    
    return true;
}

function clearPopupNameError() {
    removeFieldError('popupName');
}

function clearPopupEmailError() {
    removeFieldError('popupEmail');
}

function clearPopupPhoneError() {
    removeFieldError('popupPhone');
}

popup.addEventListener('click', function(event) {// Close when clicking outside the form
    if (event.target === popup) {
        closePopup();
    }
});


document.addEventListener('keydown', function(event) {// Close on Escape key
    if (event.key === 'Escape') {
        closePopup();
    }
});


function handleSubscription(event) {
    event.preventDefault();
    
    const isNameValid = validatePopupName();
    const isEmailValid = validatePopupEmail();
    const isPhoneValid = validatePopupPhone();
    
    const isValid = isNameValid && isEmailValid && isPhoneValid;
    
    if (isValid) {
        const name = document.getElementById('popupName').value.trim();
        const email = document.getElementById('popupEmail').value.trim();
        const phone = document.getElementById('popupPhone').value.trim();
        
        alert('✅ Thank you for subscribing, ' + name + '!\n\nWe will send updates to: ' + email);
        document.getElementById('subscriptionForm').reset();
        closePopup();
        
        console.log('✅ Subscription successful:', { name: name, email: email, phone: phone });
    } else {
        console.log('❌ Please correct the errors in the form');
    }
}


//task 4 color changer
const backgroundColors = [
    { name: 'Dark Blue', value: '#1a1a2e' },
    { name: 'Deep Purple', value: '#16213e' },
    { name: 'Dark Green', value: '#1a2e1a' },
    { name: 'Burgundy', value: '#2e1a1a' },
    { name: 'Dark Teal', value: '#1a2e2e' },
    { name: 'Charcoal', value: '#1a1a1a' }
];

let currentColorIndex = 0;

function changeBackgroundColor() {
    currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
    
    const newColor = backgroundColors[currentColorIndex];
    
    document.body.style.backgroundColor = newColor.value;
    
    const colorDisplay = document.getElementById('currentColorDisplay');
    if (colorDisplay) {
        colorDisplay.textContent = 'Current Background: ' + newColor.name;
    }
    
    console.log('Background changed to:', newColor.name, newColor.value);
}

//task 5 time display
function updateDateTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[now.getMonth()];
    const day = now.getDate();
    
    const formattedDate = month + ' ' + day + ', ' + year;
    
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
    const secondsFormatted = seconds < 10 ? '0' + seconds : seconds;
    
    const formattedTime = hours + ':' + minutesFormatted + ':' + secondsFormatted + ' ' + ampm;

    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayNames[now.getDay()];
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    const dayElement = document.getElementById('currentDay');
    const timezoneElement = document.getElementById('timezone');
    
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
    
    if (timeElement) {
        timeElement.textContent = formattedTime;
    }
    
    if (dayElement) {
        dayElement.textContent = dayOfWeek;
    }
    
    if (timezoneElement) {
        timezoneElement.textContent = 'Timezone: ' + timezone;
    }
}

updateDateTime();

setInterval(updateDateTime, 1000);