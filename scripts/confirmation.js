//task1
function initPersonalizedGreeting() {
    const greetingElement = document.getElementById('greeting');
    
    if (!greetingElement) {
        console.warn('Greeting element not found');
        return;
    }
    
    const customerName = localStorage.getItem('customerFirstName');
    
    if (customerName) {
        greetingElement.textContent = `Congratulations, ${customerName}! 🎉`;
        
        greetingElement.style.fontSize = '2rem';
        greetingElement.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            greetingElement.style.transform = 'scale(1)';
        }, 300);
        
        console.log(`✅ Personalized greeting for: ${customerName}`);
    } else {
        greetingElement.textContent = 'Hello! 🎬';
        
        console.log('ℹ️ Using generic greeting (no stored name)');
    }
}

document.addEventListener('DOMContentLoaded', initPersonalizedGreeting);
