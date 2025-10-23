// Text Rotation Animation
document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.text-rotating span');
    let currentIndex = 0;

    function rotateText() {
        textElements[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % textElements.length;
        textElements[currentIndex].style.display = 'inline';
    }

    // Initialize
    textElements.forEach((el, index) => {
        if (index !== 0) el.style.display = 'none';
    });

    // Start rotation
    setInterval(rotateText, 3000);
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 50; // Adjust speed here
    const duration = 2000; // 2 seconds
    const interval = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '%');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, interval);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('counter-animation')) {
                animateCounter(entry.target);
            } else {
                entry.target.classList.add('animate');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.animate-fade-in, .animate-slide-up, .counter-animation, .service-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});