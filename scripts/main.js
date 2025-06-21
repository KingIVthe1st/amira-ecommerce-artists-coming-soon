/**
 * AMIRA RAHIM - ECOMMERCE FOR ARTISTS COMING SOON
 * Main JavaScript Functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Amira Rahim - Ecommerce for Artists Coming Soon Page Loaded');
    
    // Initialize all functionality
    initializeAnimations();
    initializeParticles();
    initializeScrollEffects();
    initializeAccessibility();
    
    // Log successful initialization
    console.log('All page functionality initialized successfully');
});

/**
 * Initialize scroll-based animations using Intersection Observer
 */
function initializeAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve the element after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-observer, .slide-in-observer, .scale-in-observer');
    animatedElements.forEach(el => observer.observe(el));

    // Add staggered delays to grid items
    const gridItems = document.querySelectorAll('.preview-grid .preview-card');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    console.log(`Initialized animations for ${animatedElements.length} elements`);
}

/**
 * Initialize floating particles background effect
 */
function initializeParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    // Create floating particle elements
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }

    console.log(`Created ${particleCount} floating particles`);
}

/**
 * Create individual particle element
 */
function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2; // 2-6px
    const left = Math.random() * 100; // 0-100%
    const animationDuration = Math.random() * 20 + 15; // 15-35s
    const delay = Math.random() * 20; // 0-20s delay
    const opacity = Math.random() * 0.1 + 0.05; // 0.05-0.15
    
    // Apply styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        top: 100%;
        background: radial-gradient(circle, rgba(255, 99, 132, ${opacity}) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: floatUp ${animationDuration}s linear ${delay}s infinite;
        z-index: 1;
    `;
    
    container.appendChild(particle);
}

// Add CSS for particle animation
if (!document.querySelector('#particle-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for background gradient
        const gradientBg = document.querySelector('.gradient-bg');
        if (gradientBg) {
            gradientBg.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax effect for particles
        const particles = document.querySelector('.floating-particles');
        if (particles) {
            particles.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Throttled scroll listener
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    console.log('Scroll effects initialized');
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-smooth', 'none');
        document.documentElement.style.setProperty('--transition-fast', 'none');
        console.log('Reduced motion mode activated');
    }
    
    // Add focus management for form
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (emailInput && submitBtn) {
        // Enhance form accessibility
        emailInput.setAttribute('autocomplete', 'email');
        emailInput.setAttribute('spellcheck', 'false');
        
        // Add aria-describedby for form feedback
        const feedback = document.getElementById('formFeedback');
        if (feedback) {
            emailInput.setAttribute('aria-describedby', 'formFeedback');
        }
        
        console.log('Form accessibility enhanced');
    }
    
    // Add keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('.preview-card, .credential, .benefit');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        // Add keyboard event listeners
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    console.log('Keyboard navigation enhanced for interactive elements');
}

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Utility function to throttle function calls
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

/**
 * Add smooth scrolling for any anchor links
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Smooth scrolling initialized for anchor links');
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', initializeSmoothScroll);

/**
 * Performance monitoring
 */
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals if supported
    if ('web-vital' in window) {
        // This would integrate with Web Vitals library if included
        console.log('Performance monitoring ready');
    }
    
    // Simple performance logging
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Log memory usage if available
        if (performance.memory) {
            console.log(`Memory usage: ${Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)}MB`);
        }
    });
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Export functions for potential external use
window.AmiraComingSoon = {
    initializeAnimations,
    initializeParticles,
    initializeScrollEffects,
    initializeAccessibility,
    isInViewport,
    throttle
};