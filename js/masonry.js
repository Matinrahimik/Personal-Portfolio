// This script will help with masonry layout calculations if needed
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.masonry-grid');
    const items = document.querySelectorAll('.masonry-item');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    // Add any additional masonry layout logic here if needed
    // For now, CSS Grid handles most of the layout

    // Image loading optimization
    const images = document.querySelectorAll('.masonry-item img');
    
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px' // Start loading images 50px before they enter viewport
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Create a temporary image to load
                const tempImg = new Image();
                tempImg.src = img.src;
                
                tempImg.onload = function() {
                    img.classList.add('loaded');
                    img.parentElement.classList.add('loaded');
                };
                
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // Scroll animation
    const animateItems = document.querySelectorAll('.masonry-item');

    const animateOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.classList.add('animate');
            } else {
                const item = entry.target;
                item.classList.remove('animate');
            }
        });
    }, animateOptions);

    animateItems.forEach(item => animateOnScroll.observe(item));
}); 