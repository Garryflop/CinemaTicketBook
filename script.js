let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showNextItem() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function showPrevItem() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

function updateCarousel() {
    // Move to the current item using translateX
    const offset = -currentIndex * 100;
    items.forEach(item => {
        item.style.transform = `translateX(${offset}%)`;
    });
}

// Start with the first item
updateCarousel();

// Adding event listeners for navigation buttons
document.querySelector('.next').addEventListener('click', showNextItem);
document.querySelector('.prev').addEventListener('click', showPrevItem);

// Automatic carousel rotation every 5 seconds
setInterval(showNextItem, 5000); 
