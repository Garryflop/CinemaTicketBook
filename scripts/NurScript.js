// =============================================================================
// ASSIGNMENT #5: INTRODUCTION TO JAVASCRIPT
// Team: Absolute Cinema
// Members: Diasbek Amangeldiyev, Ernar Omarov, Nurdaulet Saparbekov
// =============================================================================

// =============================================================================
// TASK 1: FORM VALIDATION
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
    const customerForm = document.getElementById('customerForm');
    
    if (customerForm) {
        // Add validation on form submit
        customerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            let errorMessages = [];
            
            // Validate First Name
            const firstName = document.getElementById('firstName');
            if (firstName && firstName.value.trim() === '') {
                isValid = false;
                errorMessages.push('First name is required');
                showError(firstName, 'Please enter your first name');
            } else if (firstName) {
                clearError(firstName);
            }
            
            // Validate Last Name
            const lastName = document.getElementById('lastName');
            if (lastName && lastName.value.trim() === '') {
                isValid = false;
                errorMessages.push('Last name is required');
                showError(lastName, 'Please enter your last name');
            } else if (lastName) {
                clearError(lastName);
            }
            
            // Validate Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && email.value.trim() === '') {
                isValid = false;
                errorMessages.push('Email is required');
                showError(email, 'Please enter your email address');
            } else if (email && !emailRegex.test(email.value)) {
                isValid = false;
                errorMessages.push('Invalid email format');
                showError(email, 'Please enter a valid email (example@domain.com)');
            } else if (email) {
                clearError(email);
            }
            
            // Validate Phone
            const phone = document.getElementById('phone');
            const phoneRegex = /^\+?7\s?\(?\d{3}\)?\s?\d{3}-?\d{4}$/;
            if (phone && phone.value.trim() === '') {
                isValid = false;
                errorMessages.push('Phone number is required');
                showError(phone, 'Please enter your phone number');
            } else if (phone && !phoneRegex.test(phone.value)) {
                isValid = false;
                errorMessages.push('Invalid phone format');
                showError(phone, 'Please enter a valid phone (+7 XXX XXX-XXXX)');
            } else if (phone) {
                clearError(phone);
            }
            
            // Validate Terms checkbox
            const terms = document.getElementById('terms');
            if (terms && !terms.checked) {
                isValid = false;
                errorMessages.push('You must agree to the terms and conditions');
                showError(terms, 'Please accept the terms and conditions');
            } else if (terms) {
                clearError(terms);
            }
            
            // Validate Card Number (if visible)
            const cardNumber = document.getElementById('cardNumber');
            if (cardNumber && cardNumber.offsetParent !== null) {
                const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
                if (cardNumber.value.trim() === '') {
                    isValid = false;
                    showError(cardNumber, 'Card number is required');
                } else if (!cardRegex.test(cardNumber.value)) {
                    isValid = false;
                    showError(cardNumber, 'Please enter a valid 16-digit card number');
                } else {
                    clearError(cardNumber);
                }
            }
            
            // Validate Expiry Date (if visible)
            const expiryDate = document.getElementById('expiryDate');
            if (expiryDate && expiryDate.offsetParent !== null) {
                const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                if (expiryDate.value.trim() === '') {
                    isValid = false;
                    showError(expiryDate, 'Expiry date is required');
                } else if (!expiryRegex.test(expiryDate.value)) {
                    isValid = false;
                    showError(expiryDate, 'Please enter valid expiry date (MM/YY)');
                } else {
                    clearError(expiryDate);
                }
            }
            
            // Validate CVV (if visible)
            const cvv = document.getElementById('cvv');
            if (cvv && cvv.offsetParent !== null) {
                const cvvRegex = /^\d{3,4}$/;
                if (cvv.value.trim() === '') {
                    isValid = false;
                    showError(cvv, 'CVV is required');
                } else if (!cvvRegex.test(cvv.value)) {
                    isValid = false;
                    showError(cvv, 'Please enter a valid 3-4 digit CVV');
                } else {
                    clearError(cvv);
                }
            }
            
            // If form is valid, show success message
            if (isValid) {
                alert('✅ Form validation successful! All information is correct.');
                console.log('Form submitted successfully');
                // You can proceed with form submission here
            } else {
                alert('❌ Please correct the following errors:\n\n' + errorMessages.join('\n'));
            }
        });
    }
});

// Helper function to show error
function showError(element, message) {
    element.style.borderColor = '#dc3545';
    
    // Remove existing error message if any
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    element.parentElement.appendChild(errorDiv);
}

// Helper function to clear error
function clearError(element) {
    element.style.borderColor = 'rgba(255, 107, 53, 0.3)';
    const errorMsg = element.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// =============================================================================
// TASK 2: ACCORDION FOR FAQs
// =============================================================================
function createAccordion() {
    const faqSection = document.createElement('section');
    faqSection.className = 'section';
    faqSection.id = 'faq-section';
    faqSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <div class="accordion-container" style="max-width: 800px; margin: 0 auto;">
                <div class="accordion-item">
                    <div class="accordion-header">
                        <h3>How do I book tickets online?</h3>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p>Select your movie, choose your preferred showtime, pick your seats, and complete the payment. You'll receive a confirmation email with your e-tickets.</p>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <div class="accordion-header">
                        <h3>Can I cancel or modify my booking?</h3>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p>Yes, you can cancel or modify your booking up to 2 hours before the showtime. A cancellation fee may apply. Contact our customer service for assistance.</p>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <div class="accordion-header">
                        <h3>What payment methods do you accept?</h3>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p>We accept Visa, MasterCard, American Express, Kaspi, Apple Pay, and Google Pay. All transactions are secure and encrypted.</p>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <div class="accordion-header">
                        <h3>Do you offer group discounts?</h3>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p>Yes! Groups of 10 or more people can enjoy special discounted rates. Please contact us at least 24 hours in advance to arrange group bookings.</p>
                    </div>
                </div>
                
                <div class="accordion-item">
                    <div class="accordion-header">
                        <h3>What should I bring to the cinema?</h3>
                        <span class="accordion-icon">+</span>
                    </div>
                    <div class="accordion-content">
                        <p>Bring your booking confirmation (digital or printed), a valid ID, and arrive 15 minutes before showtime. Outside food and beverages are not permitted.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for accordion
    const style = document.createElement('style');
    style.textContent = `
        .accordion-item {
            background: rgba(30, 30, 60, 0.8);
            border-radius: 15px;
            margin-bottom: 15px;
            border: 1px solid rgba(255, 105, 180, 0.3);
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .accordion-item:hover {
            border-color: #ff69b4;
        }
        
        .accordion-header {
            padding: 20px 25px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background 0.3s ease;
        }
        
        .accordion-header:hover {
            background: rgba(255, 105, 180, 0.1);
        }
        
        .accordion-header h3 {
            margin: 0;
            font-size: 18px;
            color: #ffffff;
        }
        
        .accordion-icon {
            font-size: 28px;
            color: #ff69b4;
            transition: transform 0.3s ease;
            font-weight: bold;
        }
        
        .accordion-item.active .accordion-icon {
            transform: rotate(45deg);
        }
        
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.4s ease;
            padding: 0 25px;
        }
        
        .accordion-item.active .accordion-content {
            max-height: 500px;
            padding: 0 25px 20px 25px;
        }
        
        .accordion-content p {
            color: #cccccc;
            line-height: 1.6;
            margin: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Insert before footer
    const footer = document.querySelector('footer');
    if (footer && footer.parentElement) {
        footer.parentElement.insertBefore(faqSection, footer);
    }
    
    // Add click event listeners
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// Initialize accordion when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAccordion);
} else {
    createAccordion();
}

// =============================================================================
// TASK 3: POPUP SUBSCRIPTION FORM
// =============================================================================
function createPopupForm() {
    // Create popup HTML
    const popupHTML = `
        <div id="subscriptionPopup" class="popup-overlay">
            <div class="popup-container">
                <button class="popup-close" onclick="closePopup()">&times;</button>
                <h2>Subscribe to Our Newsletter</h2>
                <p>Get exclusive movie deals and updates!</p>
                <form id="subscriptionForm" class="popup-form">
                    <input type="text" id="popupName" placeholder="Your Name" required>
                    <input type="email" id="popupEmail" placeholder="Your Email" required>
                    <button type="submit" class="btn">Subscribe Now</button>
                </form>
            </div>
        </div>
        
        <button id="openPopupBtn" class="floating-subscribe-btn">
            📬 Subscribe
        </button>
    `;
    
    // Add popup to body
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Add CSS for popup
    const style = document.createElement('style');
    style.textContent = `
        .popup-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        }
        
        .popup-overlay.active {
            display: flex;
        }
        
        .popup-container {
            background: linear-gradient(135deg, #1e1e3c 0%, #2a2a4a 100%);
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            position: relative;
            border: 2px solid #ff69b4;
            box-shadow: 0 20px 60px rgba(255, 105, 180, 0.4);
            animation: slideIn 0.4s ease;
        }
        
        .popup-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 32px;
            color: #ff69b4;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .popup-close:hover {
            transform: rotate(90deg);
            color: #ff1493;
        }
        
        .popup-container h2 {
            color: #ff69b4;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .popup-container p {
            color: #cccccc;
            margin-bottom: 25px;
        }
        
        .popup-form input {
            width: 100%;
            padding: 15px;
            margin-bottom: 15px;
            border: 2px solid rgba(255, 105, 180, 0.3);
            border-radius: 10px;
            background: rgba(30, 30, 60, 0.8);
            color: #ffffff;
            font-size: 16px;
        }
        
        .popup-form input:focus {
            outline: none;
            border-color: #ff69b4;
            box-shadow: 0 0 15px rgba(255, 105, 180, 0.3);
        }
        
        .popup-form .btn {
            width: 100%;
            padding: 15px;
            font-size: 18px;
        }
        
        .floating-subscribe-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(45deg, #ff69b4, #ff1493);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .floating-subscribe-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 35px rgba(255, 105, 180, 0.6);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners
    const openBtn = document.getElementById('openPopupBtn');
    const popup = document.getElementById('subscriptionPopup');
    const form = document.getElementById('subscriptionForm');
    
    openBtn.addEventListener('click', openPopup);
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('popupName').value;
        const email = document.getElementById('popupEmail').value;
        alert(`✅ Thank you ${name}! You've been subscribed with email: ${email}`);
        closePopup();
        form.reset();
    });
}

function openPopup() {
    document.getElementById('subscriptionPopup').classList.add('active');
}

function closePopup() {
    document.getElementById('subscriptionPopup').classList.remove('active');
}

// Initialize popup
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createPopupForm);
} else {
    createPopupForm();
}

// =============================================================================
// TASK 4: CHANGE BACKGROUND COLOR
// =============================================================================
function createColorChanger() {
    const colorSection = document.createElement('section');
    colorSection.className = 'section';
    colorSection.id = 'color-changer-section';
    colorSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Background Color Changer</h2>
            <div style="text-align: center; padding: 40px; background: rgba(30, 30, 60, 0.6); border-radius: 20px;">
                <p style="margin-bottom: 20px; font-size: 18px;">Click the button to change the page background color!</p>
                <button id="colorChangeBtn" class="btn" style="font-size: 20px; padding: 15px 40px;">
                    🎨 Change Background Color
                </button>
                <p id="currentColor" style="margin-top: 20px; color: #ff69b4; font-weight: bold;"></p>
            </div>
        </div>
    `;
    
    // Insert before footer
    const footer = document.querySelector('footer');
    if (footer && footer.parentElement) {
        footer.parentElement.insertBefore(colorSection, footer);
    }
    
    // Array of colors to cycle through
    const colors = [
        { name: 'Dark Blue', value: '#1a1a2e' },
        { name: 'Deep Purple', value: '#16213e' },
        { name: 'Dark Green', value: '#1a2e1a' },
        { name: 'Burgundy', value: '#2e1a1a' },
        { name: 'Navy', value: '#0f1419' },
        { name: 'Dark Teal', value: '#1a2e2e' },
        { name: 'Charcoal', value: '#1a1a1a' }
    ];
    
    let currentColorIndex = 0;
    
    const colorBtn = document.getElementById('colorChangeBtn');
    const colorDisplay = document.getElementById('currentColor');
    
    colorBtn.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        const newColor = colors[currentColorIndex];
        
        document.body.style.backgroundColor = newColor.value;
        colorDisplay.textContent = `Current Background: ${newColor.name}`;
        
        // Add animation effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
}

// Initialize color changer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createColorChanger);
} else {
    createColorChanger();
}

// =============================================================================
// TASK 5: DISPLAY CURRENT DATE AND TIME
// =============================================================================
function createDateTimeDisplay() {
    const dateTimeSection = document.createElement('section');
    dateTimeSection.className = 'section';
    dateTimeSection.id = 'datetime-section';
    dateTimeSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Current Date & Time</h2>
            <div id="dateTimeDisplay" style="text-align: center; padding: 40px; background: linear-gradient(135deg, rgba(30, 30, 60, 0.8), rgba(60, 30, 60, 0.8)); border-radius: 20px; border: 2px solid #ff69b4;">
                <div id="currentDate" style="font-size: 32px; color: #ff69b4; margin-bottom: 15px; font-weight: bold;"></div>
                <div id="currentTime" style="font-size: 48px; color: #ffffff; font-weight: bold; font-family: monospace;"></div>
                <div id="currentDay" style="font-size: 20px; color: #cccccc; margin-top: 10px;"></div>
            </div>
        </div>
    `;
    
    // Insert before footer
    const footer = document.querySelector('footer');
    if (footer && footer.parentElement) {
        footer.parentElement.insertBefore(dateTimeSection, footer);
    }
    
    function updateDateTime() {
        const now = new Date();
        
        // Format date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        
        // Format time
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        
        // Get day of week
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayString = days[now.getDay()];
        
        // Update display
        document.getElementById('currentDate').textContent = dateString;
        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('currentDay').textContent = dayString;
    }
    
    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Initialize date/time display
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createDateTimeDisplay);
} else {
    createDateTimeDisplay();
}

// =============================================================================
// ADDITIONAL HELPER FUNCTIONS (from existing code)
// =============================================================================

// Payment method selection
function selectPaymentMethod(element, method) {
    // Remove 'selected' class from all payment methods
    document.querySelectorAll('.payment-method').forEach(pm => {
        pm.classList.remove('selected');
    });
    
    // Add 'selected' class to clicked method
    element.classList.add('selected');
    
    // Hide all payment forms
    const forms = ['cardPaymentForm', 'kaspiPaymentForm', 'applePayForm', 'bankTransferForm'];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) form.style.display = 'none';
    });
    
    // Show selected payment form
    const formMap = {
        'card': 'cardPaymentForm',
        'kaspi': 'kaspiPaymentForm',
        'applepay': 'applePayForm',
        'bank': 'bankTransferForm'
    };
    
    const selectedForm = document.getElementById(formMap[method]);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.getElementById('promoCode');
    const promoMessage = document.getElementById('promoMessage');
    const code = promoInput.value.toUpperCase();
    
    const validCodes = {
        'CINEMA10': 10,
        'WELCOME20': 20,
        'AITU50': 50
    };
    
    if (validCodes[code]) {
        const discount = validCodes[code];
        promoMessage.textContent = `✅ Promo code applied! You saved ${discount}%`;
        promoMessage.style.color = '#22c55e';
    } else if (code === '') {
        promoMessage.textContent = '';
    } else {
        promoMessage.textContent = '❌ Invalid promo code';
        promoMessage.style.color = '#dc3545';
    }
}

// Process payment
function processPayment() {
    alert('🎉 Payment processing... Your booking will be confirmed shortly!');
    setTimeout(() => {
        window.location.href = 'confirmation.html';
    }, 1500);
}

// Utility functions for confirmation page
function downloadTicket() {
    alert('📱 Ticket added to your digital wallet!');
}

function printTicket() {
    window.print();
}

function shareTicket() {
    alert('📤 Share options: Facebook, Twitter, WhatsApp');
}

function openMaps() {
    alert('🗺️ Opening Google Maps...');
}

function callCinema() {
    alert('📞 Calling cinema: +7(747) 174-25-08');
}

function resendEmail() {
    alert('📧 Confirmation email resent!');
}

function addToWallet() {
    alert('📱 Ticket added to mobile wallet!');
}

function orderSnacks() {
    alert('🍿 Opening snack pre-order menu...');
}

function shareOnFacebook() {
    alert('📘 Sharing on Facebook...');
}

function shareOnTwitter() {
    alert('🐦 Sharing on Twitter...');
}

function shareOnInstagram() {
    alert('📷 Sharing on Instagram...');
}

function shareOnWhatsApp() {
    alert('💬 Sharing on WhatsApp...');
}

console.log('✅ All JavaScript tasks initialized successfully!');