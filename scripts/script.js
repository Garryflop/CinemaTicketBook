let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function showNextItem() {
    console.log("Next item function called");  // Debugging line
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function showPrevItem() {
    console.log("Previous item function called");  // Debugging line
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

function updateCarousel() {
    console.log("Current index: " + currentIndex);  // Debugging line
    const offset = -currentIndex * 100;
    items.forEach(item => {
        item.style.transform = `translateX(${offset}%)`;
    });
}

document.querySelector('.next').addEventListener('click', showNextItem);
document.querySelector('.prev').addEventListener('click', showPrevItem);

setInterval(showNextItem, 5000);  // Carousel auto slides every 5 seconds
