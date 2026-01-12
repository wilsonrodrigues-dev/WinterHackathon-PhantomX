const menuToggle = document.getElementById('menuToggle');
const sideNav = document.getElementById('sideNav');
const navOverlay = document.getElementById('navOverlay');

// Helper to toggle Menu State
const toggleMenu = (isOpen) => {
    menuToggle.classList.toggle('open', isOpen);
    sideNav.classList.toggle('show', isOpen);
    navOverlay.classList.toggle('show', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent background scroll
};

menuToggle.addEventListener('click', () => {
    const isOpening = !sideNav.classList.contains('show');
    toggleMenu(isOpening);
});

navOverlay.addEventListener('click', () => toggleMenu(false));

// Close menu when a link is clicked
sideNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

// Auto-play every 5 seconds
setInterval(nextSlide, 5000);
