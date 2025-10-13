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
        // alert('❌ Please correct the following errors:\n\n• ' + errorMessages.join('\n• '));
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
        // alert('✅ Payment Information validated successfully!\n\nProcessing your payment...');
        setTimeout(function() {
            window.location.href = 'confirmation.html';
        }, 1500);
        return true;
    } else {
        // alert('❌ Please correct the following errors:\n\n• ' + errorMessages.join('\n• '));
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


const customerFormElement = document.getElementById('customerForm');
if (customerFormElement) {
    customerFormElement.addEventListener('submit', validateCustomerForm);
}


const submitButton = document.querySelector('button[onclick="processPayment()"]');
if (submitButton) {
    submitButton.onclick = validatePaymentForm;
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
}

function closePopup() {
    popup.classList.remove('active');
    console.log('❌ Popup closed');
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

    clearAllErrors();
    
    let isValid = true;
    let errorMessages = [];
    
    const name = document.getElementById('popupName').value.trim();
    const email = document.getElementById('popupEmail').value.trim();
    const phone = document.getElementById('popupPhone').value.trim();
    
    if (name === '') {
        isValid = false;
        errorMessages.push('Name is required');
        showFieldError('popupName', 'Please enter your full name');
    } else if (name.length < 3) {
        isValid = false;
        errorMessages.push('Name must be at least 3 characters');
        showFieldError('popupName', 'Name must be at least 3 characters');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        isValid = false;
        errorMessages.push('Name can only contain letters');
        showFieldError('popupName', 'Only letters and spaces allowed');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        isValid = false;
        errorMessages.push('Email is required');
        showFieldError('popupEmail', 'Please enter your email address');
    } else if (!emailRegex.test(email)) {
        isValid = false;
        errorMessages.push('Invalid email format');
        showFieldError('popupEmail', 'Please enter a valid email (example@domain.com)');
    }
    

    if (phone !== '') {
        const phoneRegex = /^\+?7\s?\(?\d{3}\)?\s?\d{3}-?\d{4}$/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
            errorMessages.push('Invalid phone format');
            showFieldError('popupPhone', 'Format: +7 (XXX) XXX-XXXX');
        }
    }
    
    if (isValid) {
        alert('✅ Thank you for subscribing, ' + name + '!\n\nWe will send updates to: ' + email);
        document.getElementById('subscriptionForm').reset();
        
        closePopup();
        console.log('Subscription data:', { name: name, email: email, phone: phone });
    } else {
        console.log('❌ Validation errors:', errorMessages);
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