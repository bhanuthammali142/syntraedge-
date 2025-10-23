/* 
   SyntraEdge Global - Common JavaScript Functions
   Shared functionality across all pages
*/

// Global configuration for navigation
const SyntraEdgeGlobal = {
    // Default navigation configuration
    navConfig: {
        basePath: '',
        currentPage: '',
        logoPath: 'images/Logo-C.png'
    },
    
    // Initialize the entire website system
    init: function(config = {}) {
        // Merge provided config with defaults
        this.navConfig = { ...this.navConfig, ...config };
        
        // Initialize all components
        this.initNavigation();
        this.initScrollEffects();
        this.initAnimations();
        
        console.log('SyntraEdge Global system initialized');
    },
    
    // Navigation system
    initNavigation: function() {
        // Set logo path
        const logoElement = document.getElementById('navLogo');
        if (logoElement && this.navConfig.logoPath) {
            logoElement.src = this.navConfig.logoPath;
        }
        
        // Set active page
        if (this.navConfig.currentPage) {
            this.setActivePage(this.navConfig.currentPage);
        }
        
        // Initialize navbar scroll effect
        this.initNavbarScrollEffect();
    },
    
    // Set active page styling
    setActivePage: function(pageName) {
        // Remove any existing active classes
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        // Page mapping to navigation items
        const pageMapping = {
            'home': 0,
            'services': 1,
            'testimonials': 2, 
            'about': 3,
            'careers': 4,
            'contact': 5
        };
        
        if (pageMapping[pageName] !== undefined) {
            const navLinks = document.querySelectorAll('.navbar-nav > .nav-item > .nav-link');
            if (navLinks[pageMapping[pageName]]) {
                navLinks[pageMapping[pageName]].classList.add('active');
                navLinks[pageMapping[pageName]].setAttribute('aria-current', 'page');
            }
        }
    },
    
    // Navigation functions
    navigateToHome: function() {
        window.location.href = this.navConfig.basePath + 'index.html';
    },
    
    navigateToPage: function(page) {
        window.location.href = this.navConfig.basePath + page;
    },
    
    // Navbar scroll effect
    initNavbarScrollEffect: function() {
        const mainNavbar = document.getElementById('mainNavbar');
        if (!mainNavbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('scrolled');
            } else {
                mainNavbar.classList.remove('scrolled');
            }
        });
    },
    
    // Scroll animations system
    initScrollEffects: function() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const animationType = target.getAttribute('data-animation');
                    const delay = target.style.transitionDelay || '0s';

                    // Apply animation classes
                    if (animationType === 'fade-in') {
                        target.classList.add('animate-fade-in-on-scroll');
                        target.style.animationDelay = delay;
                    } else if (animationType === 'slide-up') {
                        target.classList.add('animate-slide-up-on-scroll');
                        target.style.animationDelay = delay;
                    } else {
                        target.style.opacity = '1';
                        target.style.transform = 'translateY(0)';
                    }
                    
                    // Handle counter animations
                    if (target.classList.contains('achievement-card')) {
                        this.startCounter(target);
                    }

                    // Handle testimonial animations
                    if (target.classList.contains('testimonial-card')) {
                        this.animateTestimonialContent(target);
                    }

                    // Handle timeline animations
                    if (target.classList.contains('timeline-item')) {
                        target.classList.add('show');
                    }

                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        // Observe all scroll-animate elements
        const elementsToAnimate = document.querySelectorAll('.scroll-animate, .achievement-card, .testimonial-card, .timeline-item');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            if (el.getAttribute('data-animation') || el.classList.contains('timeline-item')) {
                observer.observe(el);
            }
        });

        // Apply immediate animations for hero elements
        document.querySelectorAll('.hero-section .scroll-animate, .hero-banner .scroll-animate').forEach(el => {
            const animationType = el.getAttribute('data-animation');
            if (animationType === 'fade-in') {
                 el.classList.add('animate-fade-in-on-scroll');
            } else if (animationType === 'slide-up') {
                 el.classList.add('animate-slide-up-on-scroll');
            }
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    },
    
    // Counter animation
    startCounter: function(target) {
        const countElement = target.querySelector('.counter-number');
        if (!countElement) return;
        
        const finalValue = parseInt(countElement.getAttribute('data-target'));
        const duration = 2000;
        let startTimestamp = null;
        const isPercentage = countElement.textContent.includes('%');
        
        // Prevent re-running counter
        if (target.getAttribute('data-counter-ran') === 'true') {
            return;
        }
        target.setAttribute('data-counter-ran', 'true');

        countElement.textContent = '0';

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const percentage = Math.min(progress / duration, 1);
            const currentCount = Math.floor(percentage * finalValue);

            countElement.textContent = currentCount;
            if (isPercentage) {
                countElement.textContent += '%';
            }

            if (percentage < 1) {
                window.requestAnimationFrame(step);
            } else {
                countElement.textContent = finalValue + (isPercentage ? '%' : '+');
            }
        };

        window.requestAnimationFrame(step);
    },
    
    // Testimonial content animation
    animateTestimonialContent: function(card) {
        const innerElements = card.querySelectorAll('.testimonial-content');
        if (innerElements.length === 0) return;
        
        const parentDelayStr = card.style.transitionDelay || '0s';
        const parentDelayMs = parseFloat(parentDelayStr) * 1000;
        
        innerElements.forEach((el) => {
            const elementDelay = parseFloat(el.getAttribute('data-delay') || 0);
            const totalDelay = parentDelayMs + (elementDelay * 1000);

            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translate(0, 0)';
            }, totalDelay);
        });
    },
    
    // Text rotation effect (for hero sections)
    initTextRotation: function(selector = '.text-rotating span') {
        const textElements = document.querySelectorAll(selector);
        if (textElements.length === 0) return;

        let currentIndex = 0;
        textElements.forEach((el, index) => {
            el.style.display = index === 0 ? 'inline-block' : 'none';
        });

        function rotateText() {
            textElements[currentIndex].style.opacity = '0';
            textElements[currentIndex].style.transform = 'translateY(10px)';

            currentIndex = (currentIndex + 1) % textElements.length;

            setTimeout(() => {
                textElements.forEach((el, index) => {
                    el.style.display = 'none';
                });
                textElements[currentIndex].style.display = 'inline-block';
                
                setTimeout(() => {
                    textElements[currentIndex].style.opacity = '1';
                    textElements[currentIndex].style.transform = 'translateY(0)';
                }, 50);
            }, 500);
        }

        setInterval(rotateText, 3000);
    },
    
    // Form submission handler
    submitForm: function(formId, successMessageId, errorMessageId) {
        return function(e) {
            e.preventDefault();
            
            const form = document.getElementById(formId);
            const submitButton = form.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.button-text');
            const spinner = submitButton.querySelector('.spinner-border');
            const successMessage = document.getElementById(successMessageId);
            const errorMessage = document.getElementById(errorMessageId);

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            // Update button state
            buttonText.textContent = 'Sending...';
            spinner.classList.remove('d-none');
            submitButton.disabled = true;
            successMessage.classList.add('d-none');
            errorMessage.classList.add('d-none');

            // Simulate form submission (replace with actual endpoint)
            const formUrl = 'https://forms.gle/QjLMWKZg1ES6ZEWL7';
            const formData = new FormData(form);
            const data = new URLSearchParams(formData);

            fetch(formUrl, {
                method: 'POST',
                body: data,
                mode: 'no-cors'
            })
            .then(() => {
                successMessage.classList.remove('d-none');
                form.reset();
                form.classList.remove('was-validated');
                setTimeout(() => successMessage.classList.add('d-none'), 5000);
            })
            .catch((error) => {
                console.error('Submission Error:', error);
                errorMessage.classList.remove('d-none');
                setTimeout(() => errorMessage.classList.add('d-none'), 5000);
            })
            .finally(() => {
                buttonText.textContent = 'Send Message';
                spinner.classList.add('d-none');
                submitButton.disabled = false;
            });
        };
    },
    
    // Initialize all animations
    initAnimations: function() {
        this.initScrollEffects();
        
        // Initialize text rotation if it exists
        if (document.querySelector('.text-rotating')) {
            this.initTextRotation();
        }
    }
};

// Global navigation functions for backward compatibility
function navigateToHome() {
    SyntraEdgeGlobal.navigateToHome();
}

function navigateToPage(page) {
    SyntraEdgeGlobal.navigateToPage(page);
}

function initializeNavigation(config) {
    SyntraEdgeGlobal.init(config);
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Basic initialization - pages can override with specific config
    SyntraEdgeGlobal.init();
});

// Export for use in modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SyntraEdgeGlobal;
}