// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const mainLogo = document.querySelector('.main-logo');

    // Initial check for page position
    checkScroll();

    // Listen for scroll events
    window.addEventListener('scroll', checkScroll);

    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            mainLogo.style.height = '35px'; // Slightly smaller logo when scrolled
        } else {
            navbar.classList.remove('scrolled');
            mainLogo.style.height = '40px'; // Original logo size
        }
    }

    // Preload both versions of the logo for smooth transitions
    const logoB = new Image();
    logoB.src = '/images/Logo-B.png';
    const logoW = new Image();
    logoW.src = '/images/Logo-W (1).png';
});