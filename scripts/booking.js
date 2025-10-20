function initCustomerDataStorage() {
    const customerForm = document.getElementById('customerForm');
    
    if (!customerForm) {
        console.warn('Customer form not found');
        return;
    }

    customerForm.addEventListener('submit', function(event) {
        const firstNameInput = document.getElementById('firstName');
        
        if (firstNameInput && firstNameInput.value.trim()) {
            const firstName = firstNameInput.value.trim();
            
            localStorage.setItem('customerFirstName', firstName);
            
            console.log(`✅ Saved customer name to localStorage: ${firstName}`);
            
            // TASK 3: Play success sound on form submission
            if (typeof soundManager !== 'undefined') {
                soundManager.playConfirmation();
                console.log('🔊 Success sound played on booking submission');
            }
        }
    });
    
    console.log('✅ Customer data storage initialized');
}

/**
 * TASK 3: Add click sounds to all buttons on booking form
 */
function setupBookingFormSounds() {
    // Add click sound to all buttons
    const allButtons = document.querySelectorAll('button, .btn, input[type="submit"], input[type="button"]');
    
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (typeof soundManager !== 'undefined') {
                soundManager.playClick();
            }
        });
    });
    
    // Add sound to payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            if (typeof soundManager !== 'undefined') {
                soundManager.playClick();
            }
        });
    });
    
    // Add sound to form inputs on focus
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (typeof soundManager !== 'undefined') {
                soundManager.playHover();
            }
        });
    });
    
    console.log(`🔊 Added sounds to ${allButtons.length} buttons and ${formInputs.length} form inputs`);
}

document.addEventListener('DOMContentLoaded', () => {
    initCustomerDataStorage();
    setupBookingFormSounds(); // Add sound effects
});
