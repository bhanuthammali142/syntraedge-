// Counter animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    const animationDuration = 2000; // 2 seconds
    const frameDuration = 1000/60; // 60 fps
    
    const countUp = (target, current, element) => {
        const increment = (target - current) / (animationDuration / frameDuration);
        if (current < target) {
            element.textContent = Math.ceil(current + increment);
            setTimeout(() => countUp(target, current + increment, element), frameDuration);
        } else {
            element.textContent = target;
        }
    };

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                countUp(target, 0, element);
                observer.unobserve(element);
            }
        });
    };

    const observer = new IntersectionObserver(startCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
});