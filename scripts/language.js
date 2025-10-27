// Task 2: Language Selector with Switch Statement
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-movies': 'Movies',
        'nav-cinemas': 'Cinemas',
        'nav-book': 'Book Seats',
        'nav-account': 'Account',
        'nav-bookings': 'My Bookings',
        
        // Sidebar
        'sidebar-title': 'Quick Links',
        'sidebar-ticket': '🎫 Your Ticket',
        'sidebar-info': '🎬 Important Info',
        'sidebar-next': '🔜 What\'s Next?',
        'sidebar-recs': '⭐ Recs',
        
        // Banner
        'banner-title': 'Booking Confirmed!',
        'banner-subtitle': 'Your tickets have been successfully booked. Get ready for an amazing movie experience!',
        
        // Ticket Section
        'ticket-title': 'Your Digital Ticket',
        'ticket-date': 'Date',
        'ticket-time': 'Time',
        'ticket-cinema': 'Cinema',
        'ticket-screen': 'Screen',
        'seat-info-title': 'Seat Information',
        'seat-tickets': '2 Standard Tickets',
        'order-details-title': 'Order Details',
        'payment-method': 'Payment:',
        'arrive-early': 'Please arrive 15 minutes before showtime',
        'ticket-total': 'Total: ₸1140',
        'ticket-valid': 'Valid Entry',
        
        // Action Buttons
        'btn-wallet': '📱 Add to Wallet',
        'btn-print': '🖨️ Print Ticket',
        'btn-share': '📤 Share',
        
        // Booking Code
        'booking-code-title': 'Booking Code',
        'booking-code-desc': 'Use this code for future reference or customer support',
        
        // Order Summary
        'order-summary-title': 'Order Summary',
        'payment-details': 'Payment Details',
        'standard-tickets': '2 × Standard Tickets',
        'booking-fee': 'Booking Fee',
        'vat': 'VAT (12%)',
        'total-paid': 'Total Paid',
        'payment-success': '✓ Payment successful via Credit Card',
        
        // Customer Info
        'customer-info-title': 'Customer Information',
        'customer-name': 'Name:',
        'customer-email': 'Email:',
        'customer-phone': 'Phone:',
        'booking-date': 'Booking Date:',
        
        // Important Information
        'important-info-title': 'Important Information',
        'cinema-location': '📍 Cinema Location',
        'btn-directions': '🗺️ Directions',
        'btn-call': '📞 Call',
        'show-info': '⏰ Show Information',
        'arrival-time': 'Arrival Time:',
        'arrive-early-text': 'Please arrive 15 minutes early',
        'duration': 'Duration:',
        'end-time': 'Expected end time: 10:15 PM',
        
        // Guidelines
        'guidelines-title': '📋 Cinema Guidelines',
        'guideline-1': 'Show your QR code or mobile ticket',
        'guideline-2': 'No outside food or drinks allowed',
        'guideline-3': 'Please silence mobile phones',
        'guideline-4': 'Latecomers may not be admitted',
        'guideline-5': 'No refunds or exchanges',
        
        // What's Next
        'whats-next-title': 'What\'s Next?',
        'check-email': 'Check Your Email',
        'email-text': 'We\'ve sent your tickets and booking confirmation to your email address. Check your inbox and spam folder.',
        'btn-resend': 'Resend Email',
        'save-mobile': 'Save to Mobile',
        'mobile-text': 'Add your tickets to your mobile wallet for easy access at the cinema. Works with Apple Wallet and Google Pay.',
        'btn-add-wallet': 'Add to Wallet',
        'preorder-snacks': 'Pre-Order Snacks',
        'snacks-text': 'Skip the queue and pre-order your favorite movie snacks. Pick them up at the cinema before the show.',
        'btn-order-snacks': 'Order Snacks',
        'share-plans': 'Share Your Movie Plans',
        
        // Recommendations
        'recommendations-title': 'You Might Also Like',
        'btn-book-now': 'Book Now',
        
        // Footer
        'color-changer-title': 'Background Color Changer',
        'color-changer-desc': 'Click the button below to change the page background color!',
        'btn-change-color': '🎨 Change Background Color',
        'current-bg': 'Current Background:',
        'footer-team-title': 'Team Members',
        'footer-member1': 'Diasbek Amangeldiyev - Foundation & Layout',
        'footer-member2': 'Ernar Omarov - Navigation & Interactive',
        'footer-member3': 'Nurdaulet Saparbekov - Forms & Advanced Features',
        'footer-course': 'Web Technologies Frontend Course'
    },
    
    ru: {
        // Navigation
        'nav-home': 'Главная',
        'nav-movies': 'Фильмы',
        'nav-cinemas': 'Кино',
        'nav-book': 'Билеты',
        'nav-account': 'Аккаунт',
        'nav-bookings': 'Брони',
        
        // Sidebar
        'sidebar-title': 'Быстрые Ссылки',
        'sidebar-ticket': '🎫 Ваш Билет',
        'sidebar-info': '🎬 Важная Информация',
        'sidebar-next': '🔜 Что Дальше?',
        'sidebar-recs': '⭐ Рекомендации',
        
        // Banner
        'banner-title': 'Бронирование Подтверждено!',
        'banner-subtitle': 'Ваши билеты успешно забронированы. Приготовьтесь к невероятному киноопыту!',
        
        // Ticket Section
        'ticket-title': 'Ваш Электронный Билет',
        'ticket-date': 'Дата',
        'ticket-time': 'Время',
        'ticket-cinema': 'Кинотеатр',
        'ticket-screen': 'Экран',
        'seat-info-title': 'Информация о Местах',
        'seat-tickets': '2 Стандартных Билета',
        'order-details-title': 'Детали Заказа',
        'payment-method': 'Оплата:',
        'arrive-early': 'Пожалуйста, прибудьте за 15 минут до начала сеанса',
        'ticket-total': 'Итого: ₸1140',
        'ticket-valid': 'Действительный Вход',
        
        // Action Buttons
        'btn-wallet': '📱 Добавить в Кошелек',
        'btn-print': '🖨️ Печать Билета',
        'btn-share': '📤 Поделиться',
        
        // Booking Code
        'booking-code-title': 'Код Бронирования',
        'booking-code-desc': 'Используйте этот код для дальнейшего обращения или поддержки клиентов',
        
        // Order Summary
        'order-summary-title': 'Сводка Заказа',
        'payment-details': 'Платежные Данные',
        'standard-tickets': '2 × Стандартных Билета',
        'booking-fee': 'Сбор за Бронирование',
        'vat': 'НДС (12%)',
        'total-paid': 'Всего Оплачено',
        'payment-success': '✓ Оплата успешно проведена банковской картой',
        
        // Customer Info
        'customer-info-title': 'Информация о Клиенте',
        'customer-name': 'Имя:',
        'customer-email': 'Email:',
        'customer-phone': 'Телефон:',
        'booking-date': 'Дата Бронирования:',
        
        // Important Information
        'important-info-title': 'Важная Информация',
        'cinema-location': '📍 Местоположение Кинотеатра',
        'btn-directions': '🗺️ Маршрут',
        'btn-call': '📞 Позвонить',
        'show-info': '⏰ Информация о Сеансе',
        'arrival-time': 'Время Прибытия:',
        'arrive-early-text': 'Пожалуйста, прибудьте за 15 минут',
        'duration': 'Продолжительность:',
        'end-time': 'Ожидаемое время окончания: 22:15',
        
        // Guidelines
        'guidelines-title': '📋 Правила Кинотеатра',
        'guideline-1': 'Покажите QR-код или мобильный билет',
        'guideline-2': 'Внешняя еда и напитки запрещены',
        'guideline-3': 'Пожалуйста, выключите мобильные телефоны',
        'guideline-4': 'Опоздавшие могут не быть допущены',
        'guideline-5': 'Возврат и обмен не предусмотрены',
        
        // What's Next
        'whats-next-title': 'Что Дальше?',
        'check-email': 'Проверьте Свою Почту',
        'email-text': 'Мы отправили ваши билеты и подтверждение бронирования на вашу электронную почту. Проверьте входящие и папку спам.',
        'btn-resend': 'Отправить Повторно',
        'save-mobile': 'Сохранить на Телефон',
        'mobile-text': 'Добавьте билеты в мобильный кошелек для удобного доступа в кинотеатре. Работает с Apple Wallet и Google Pay.',
        'btn-add-wallet': 'Добавить в Кошелек',
        'preorder-snacks': 'Предзаказ Закусок',
        'snacks-text': 'Пропустите очередь и предзакажите любимые закуски для кино. Заберите их в кинотеатре перед началом.',
        'btn-order-snacks': 'Заказать Закуски',
        'share-plans': 'Поделитесь Планами на Кино',
        
        // Recommendations
        'recommendations-title': 'Вам Также Может Понравиться',
        'btn-book-now': 'Забронировать',
        
        // Footer
        'color-changer-title': 'Смена Цвета Фона',
        'color-changer-desc': 'Нажмите кнопку ниже, чтобы изменить цвет фона страницы!',
        'btn-change-color': '🎨 Изменить Цвет Фона',
        'current-bg': 'Текущий Фон:',
        'footer-team-title': 'Члены Команды',
        'footer-member1': 'Диасбек Амангельдиев - Основа и Макет',
        'footer-member2': 'Ернар Омаров - Навигация и Интерактив',
        'footer-member3': 'Нурдаулет Сапарбеков - Формы и Продвинутые Функции',
        'footer-course': 'Курс Веб-Технологий Frontend'
    },
    
    kk: {
        // Navigation
        'nav-home': 'Басты',
        'nav-movies': 'Фильмдер',
        'nav-cinemas': 'Кино',
        'nav-book': 'Брондау',
        'nav-account': 'Аккаунт',
        'nav-bookings': 'Брондар',
        
        // Sidebar
        'sidebar-title': 'Жылдам Сілтемелер',
        'sidebar-ticket': '🎫 Сіздің Билетіңіз',
        'sidebar-info': '🎬 Маңызды Ақпарат',
        'sidebar-next': '🔜 Не Келесі?',
        'sidebar-recs': '⭐ Ұсыныстар',
        
        // Banner
        'banner-title': 'Брондау Расталды!',
        'banner-subtitle': 'Билеттеріңіз сәтті брондалды. Керемет кино тәжірибесіне дайын болыңыз!',
        
        // Ticket Section
        'ticket-title': 'Сіздің Электрондық Билетіңіз',
        'ticket-date': 'Күні',
        'ticket-time': 'Уақыты',
        'ticket-cinema': 'Кинотеатр',
        'ticket-screen': 'Экран',
        'seat-info-title': 'Орын Туралы Ақпарат',
        'seat-tickets': '2 Стандартты Билет',
        'order-details-title': 'Тапсырыс Мәліметтері',
        'payment-method': 'Төлем:',
        'arrive-early': 'Көрсетілім басталғанға дейін 15 минут бұрын келіңіз',
        'ticket-total': 'Барлығы: ₸1140',
        'ticket-valid': 'Жарамды Кіру',
        
        // Action Buttons
        'btn-wallet': '📱 Әмиянға Қосу',
        'btn-print': '🖨️ Билетті Басып Шығару',
        'btn-share': '📤 Бөлісу',
        
        // Booking Code
        'booking-code-title': 'Брондау Коды',
        'booking-code-desc': 'Бұл кодты болашақ сілтеме немесе клиенттерге қолдау үшін пайдаланыңыз',
        
        // Order Summary
        'order-summary-title': 'Тапсырыс Қорытындысы',
        'payment-details': 'Төлем Мәліметтері',
        'standard-tickets': '2 × Стандартты Билеттер',
        'booking-fee': 'Брондау Алымы',
        'vat': 'ҚҚС (12%)',
        'total-paid': 'Барлығы Төленді',
        'payment-success': '✓ Төлем банк картасы арқылы сәтті өтті',
        
        // Customer Info
        'customer-info-title': 'Клиент Ақпараты',
        'customer-name': 'Аты:',
        'customer-email': 'Email:',
        'customer-phone': 'Телефон:',
        'booking-date': 'Брондау Күні:',
        
        // Important Information
        'important-info-title': 'Маңызды Ақпарат',
        'cinema-location': '📍 Кинотеатр Орналасуы',
        'btn-directions': '🗺️ Бағыт',
        'btn-call': '📞 Қоңырау Шалу',
        'show-info': '⏰ Көрсетілім Туралы Ақпарат',
        'arrival-time': 'Келу Уақыты:',
        'arrive-early-text': '15 минут бұрын келіңіз',
        'duration': 'Ұзақтығы:',
        'end-time': 'Аяқталу уақыты: 22:15',
        
        // Guidelines
        'guidelines-title': '📋 Кинотеатр Ережелері',
        'guideline-1': 'QR кодты немесе мобильді билетті көрсетіңіз',
        'guideline-2': 'Сыртқы тамақ пен сусындар тыйым салынған',
        'guideline-3': 'Мобильді телефондарды өшіріңіз',
        'guideline-4': 'Кешіккендер кіргізілмеуі мүмкін',
        'guideline-5': 'Қайтару немесе айырбастау жоқ',
        
        // What's Next
        'whats-next-title': 'Келесі Қадам?',
        'check-email': 'Поштаңызды Тексеріңіз',
        'email-text': 'Біз билеттеріңізді және брондау растауын электрондық поштаңызға жібердік. Келген хаттар мен спам қалтасын тексеріңіз.',
        'btn-resend': 'Қайта Жіберу',
        'save-mobile': 'Телефонға Сақтау',
        'mobile-text': 'Билеттерді мобильді әмиянға қосып, кинотеатрда оңай қолжетімді етіңіз. Apple Wallet және Google Pay жұмыс істейді.',
        'btn-add-wallet': 'Әмиянға Қосу',
        'preorder-snacks': 'Тағамдарды Алдын Ала Тапсыру',
        'snacks-text': 'Кезекті өткізіп, сүйікті кино тағамдарын алдын ала тапсырыңыз. Көрсетілім алдында кинотеатрдан алып кетіңіз.',
        'btn-order-snacks': 'Тағам Тапсыру',
        'share-plans': 'Кино Жоспарларыңызбен Бөлісіңіз',
        
        // Recommendations
        'recommendations-title': 'Сізге Ұнауы Мүмкін',
        'btn-book-now': 'Брондау',
        
        // Footer
        'color-changer-title': 'Фон Түсін Өзгерту',
        'color-changer-desc': 'Бет фонының түсін өзгерту үшін төмендегі батырманы басыңыз!',
        'btn-change-color': '🎨 Фон Түсін Өзгерту',
        'current-bg': 'Ағымдағы Фон:',
        'footer-team-title': 'Команда Мүшелері',
        'footer-member1': 'Диасбек Амангелдиев - Негіз және Макет',
        'footer-member2': 'Ернар Омаров - Навигация және Интерактив',
        'footer-member3': 'Нурдаулет Сапарбеков - Формалар және Кеңейтілген Мүмкіндіктер',
        'footer-course': 'Веб Технологиялары Frontend Курсы'
    }
};

/**
 * Change language using switch statement
 */
function changeLanguage(lang) {
    let languageDisplay = '';
    let translationSet = null;
    
    // TASK 2: Switch statement to select language
    switch (lang) {
        case 'en':
            translationSet = translations.en;
            languageDisplay = 'EN';
            console.log('✅ Language switched to: English');
            break;
            
        case 'ru':
            translationSet = translations.ru;
            languageDisplay = 'RU';
            console.log('✅ Язык изменен на: Русский');
            break;
            
        case 'kk':
            translationSet = translations.kk;
            languageDisplay = 'KK';
            console.log('✅ Тіл өзгертілді: Қазақша');
            break;
            
        default:
            translationSet = translations.en;
            languageDisplay = 'EN';
            console.warn('⚠️ Unknown language code, defaulting to English');
            break;
    }
    
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    // TASK 3: Higher-Order Functions - filter() and map()
    
    // 1. FILTER: Get only elements that have valid translation keys
    const elementsArray = Array.from(elementsToTranslate);
    const validElements = elementsArray.filter(element => {
        const key = element.getAttribute('data-i18n');
        return translationSet[key] !== undefined;
    });
    
    console.log(`🔍 Filter: Found ${validElements.length} valid elements out of ${elementsArray.length}`);
    
    // 2. MAP: Create array of translation operations
    const translationOperations = validElements.map(element => {
        const key = element.getAttribute('data-i18n');
        return {
            element: element,
            key: key,
            oldText: element.textContent,
            newText: translationSet[key]
        };
    });
    
    console.log(`🗺️ Map: Created ${translationOperations.length} translation operations`);
    
    //task3: Play success sound when changing language
    if (typeof soundManager !== 'undefined') {
        soundManager.playSuccess();
    }
    
    // Apply translations
    translationOperations.forEach(operation => {
        operation.element.textContent = operation.newText;
        
        operation.element.style.transition = 'transform 0.2s ease';
        operation.element.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            operation.element.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Update language display in navbar
    const currentLanguageElement = document.getElementById('current-language');
    if (currentLanguageElement) {
        currentLanguageElement.textContent = languageDisplay;
        currentLanguageElement.style.fontWeight = 'bold';
        currentLanguageElement.style.color = '#ff69b4';
    }
    
    // Update greeting with personalized name if available
    updateGreetingWithLanguage(lang);
    
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
    
    console.log(`📊 Updated ${elementsToTranslate.length} elements`);
}

function updateGreetingWithLanguage(lang) {
    const greetingElement = document.getElementById('greeting');
    const customerName = localStorage.getItem('customerFirstName');
    
    if (!greetingElement) return;
    
    let greetingText = '';
    
    switch (lang) {
        case 'en':
            greetingText = customerName 
                ? `Thank you, ${customerName}! 🎉` 
                : 'Thank you! 🎬';
            break;
        case 'ru':
            greetingText = customerName 
                ? `Спасибо, ${customerName}! 🎉` 
                : 'Спасибо! 🎬';
            break;
            
        case 'kk':
            greetingText = customerName 
                ? `Рахмет, ${customerName}! 🎉` 
                : 'Рахмет! 🎬';
            break;
            
        default:
            greetingText = customerName 
                ? `Welcome back, ${customerName}! 🎉` 
                : 'Welcome back! 🎬';
    }
    
    greetingElement.textContent = greetingText;
}


function initLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    
    changeLanguage(savedLanguage);
    
    console.log('🌐 Language system initialized');
    console.log(`📍 Current language: ${savedLanguage.toUpperCase()}`);
}

function setupMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const languageDropdown = document.querySelector('#languageDropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Close menu when clicking on regular nav links (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Prevent dropdown toggle from closing the menu
    if (languageDropdown) {
        languageDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Close menu when changing language (after the change is applied)
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close menu after a short delay to let the language change apply
            setTimeout(() => {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }, 300);
        });
    });
    
    // Close menu when clicking on the ::before close button area
    if (navbarCollapse) {
        navbarCollapse.addEventListener('click', (e) => {
            // Check if click is in the top padding area (close button)
            const rect = navbarCollapse.getBoundingClientRect();
            if (e.clientY - rect.top < 60 && window.innerWidth < 992) {
                if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    }
}

/**
 * TASK 3: Add click sounds to all buttons
 */
function setupButtonSounds() {
    // Add click sound to all buttons
    const allButtons = document.querySelectorAll('button, .btn, .dropdown-item');
    
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (typeof soundManager !== 'undefined') {
                soundManager.playClick();
            }
        });
    });
    
    console.log(`🔊 Added click sounds to ${allButtons.length} buttons`);
}

/**
 * TASK 3: Play confirmation sound on page load
 */
function playPageLoadSound() {
    // Play confirmation sound when confirmation page loads
    if (document.body.classList.contains('confirmation-page') || 
        document.title.includes('Confirmation')) {
        setTimeout(() => {
            if (typeof soundManager !== 'undefined') {
                soundManager.playConfirmation();
                console.log('🎉 Confirmation sound played on page load');
            }
        }, 500);
    }
}

// Initialize language when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    setupMobileMenu();
    setupButtonSounds(); // Add sound effects to buttons
    playPageLoadSound(); // Play confirmation sound
});
