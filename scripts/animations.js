/**
 * AMIRA RAHIM - ECOMMERCE FOR ARTISTS COMING SOON
 * Advanced Animations JavaScript
 */

// Initialize advanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedAnimations();
    initializeInteractiveAnimations();
    initializeCursorEffects();
    console.log('Advanced animations initialized');
});

/**
 * Initialize advanced scroll-triggered animations
 */
function initializeAdvancedAnimations() {
    // Enhanced Intersection Observer for staggered animations
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerStaggeredAnimation(entry.target);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for staggered animations
    const staggerElements = document.querySelectorAll('.preview-grid, .credentials, .form-benefits');
    staggerElements.forEach(el => staggerObserver.observe(el));

    // Initialize text reveal animations
    initializeTextRevealAnimations();
    
    // Initialize morphing background
    initializeMorphingBackground();
    
    console.log('Advanced scroll animations initialized');
}

/**
 * Trigger staggered animations for child elements
 */
function triggerStaggeredAnimation(container) {
    const children = container.children;
    
    Array.from(children).forEach((child, index) => {
        setTimeout(() => {
            child.classList.add('animate-fadeInUp');
            child.style.animationDelay = `${index * 0.1}s`;
        }, index * 100);
    });
}

/**
 * Initialize text reveal animations with typewriter effect
 */
function initializeTextRevealAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        // Split text into spans for character-by-character animation
        animateTextReveal(heroTitle, 50); // 50ms delay between characters
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            animateTextReveal(heroSubtitle, 30);
        }, 1000); // Start after hero title
    }
}

/**
 * Animate text reveal character by character
 */
function animateTextReveal(element, delay) {
    const originalText = element.textContent;
    const lines = originalText.split('\n').filter(line => line.trim());
    
    element.innerHTML = '';
    
    lines.forEach((line, lineIndex) => {
        const lineSpan = document.createElement('span');
        lineSpan.className = 'title-line';
        if (lineIndex === 1) lineSpan.classList.add('accent');
        
        line.split('').forEach((char, charIndex) => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char === ' ' ? '\u00A0' : char;
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'translateY(20px)';
            charSpan.style.transition = `opacity 0.3s ease ${(lineIndex * line.length + charIndex) * delay}ms, transform 0.3s ease ${(lineIndex * line.length + charIndex) * delay}ms`;
            
            lineSpan.appendChild(charSpan);
        });
        
        element.appendChild(lineSpan);
        if (lineIndex < lines.length - 1) {
            element.appendChild(document.createElement('br'));
        }
    });
    
    // Trigger the animation
    setTimeout(() => {
        const chars = element.querySelectorAll('span span');
        chars.forEach(char => {
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
        });
    }, 100);
}

/**
 * Initialize interactive hover and click animations
 */
function initializeInteractiveAnimations() {
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.preview-card, .launch-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
        card.addEventListener('click', handleCardClick);
    });
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.submit-btn, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', handleButtonHover);
        button.addEventListener('mouseleave', handleButtonLeave);
        button.addEventListener('mousedown', handleButtonPress);
        button.addEventListener('mouseup', handleButtonRelease);
    });
    
    // Magnetic effect for interactive elements
    initializeMagneticEffects();
    
    console.log('Interactive animations initialized');
}

/**
 * Handle card hover animation
 */
function handleCardHover(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Add glow effect
    card.style.boxShadow = '0 20px 40px rgba(255, 99, 132, 0.15), 0 0 0 1px rgba(255, 99, 132, 0.1)';
    
    // Track mouse movement for tilt effect
    card.addEventListener('mousemove', handleCardTilt);
}

/**
 * Handle card leave animation
 */
function handleCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '';
    card.removeEventListener('mousemove', handleCardTilt);
}

/**
 * Handle card tilt effect based on mouse position
 */
function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / rect.height) * -10; // Max 10 degree tilt
    const rotateY = (mouseX / rect.width) * 10;
    
    card.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

/**
 * Handle card click animation
 */
function handleCardClick(e) {
    const card = e.currentTarget;
    
    // Create ripple effect
    createRippleEffect(card, e);
    
    // Pulse animation
    card.style.animation = 'pulse 0.6s ease-out';
    setTimeout(() => {
        card.style.animation = '';
    }, 600);
}

/**
 * Create ripple effect on click
 */
function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 99, 132, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple keyframes if not already present
if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Handle button hover effects
 */
function handleButtonHover(e) {
    const button = e.currentTarget;
    button.style.transform = 'translateY(-2px) scale(1.05)';
    button.style.boxShadow = '0 12px 24px rgba(255, 99, 132, 0.4)';
}

function handleButtonLeave(e) {
    const button = e.currentTarget;
    if (!button.classList.contains('pressed')) {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '';
    }
}

function handleButtonPress(e) {
    const button = e.currentTarget;
    button.classList.add('pressed');
    button.style.transform = 'translateY(0) scale(0.98)';
}

function handleButtonRelease(e) {
    const button = e.currentTarget;
    button.classList.remove('pressed');
    setTimeout(() => {
        if (!button.matches(':hover')) {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '';
        }
    }, 100);
}

/**
 * Initialize magnetic effects for interactive elements
 */
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.submit-btn, .preview-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', handleMagneticEffect);
        element.addEventListener('mouseleave', resetMagneticEffect);
    });
}

/**
 * Handle magnetic effect based on mouse position
 */
function handleMagneticEffect(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const strength = 0.3; // Magnetic strength
    const moveX = mouseX * strength;
    const moveY = mouseY * strength;
    
    element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
}

/**
 * Reset magnetic effect
 */
function resetMagneticEffect(e) {
    const element = e.currentTarget;
    element.style.transition = 'transform 0.3s ease';
    element.style.transform = element.style.transform.replace(/translate\([^)]*\)/g, '');
    
    setTimeout(() => {
        element.style.transition = '';
    }, 300);
}

/**
 * Initialize morphing background gradients
 */
function initializeMorphingBackground() {
    const gradientBg = document.querySelector('.gradient-bg');
    if (!gradientBg) return;
    
    const gradients = [
        'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        'linear-gradient(135deg, #16213e 0%, #0a0a0a 50%, #1a1a2e 100%)',
        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0a0a0a 100%)'
    ];
    
    let currentGradient = 0;
    
    setInterval(() => {
        currentGradient = (currentGradient + 1) % gradients.length;
        gradientBg.style.background = gradients[currentGradient];
    }, 10000); // Change every 10 seconds
}

/**
 * Initialize custom cursor effects
 */
function initializeCursorEffects() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 99, 132, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhance cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .preview-card, .credential');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(255, 206, 86, 0.8) 0%, transparent 70%)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(255, 99, 132, 0.6) 0%, transparent 70%)';
        });
    });
    
    console.log('Custom cursor effects initialized');
}

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || 0;
        
        if (isElementInViewport(element)) {
            setTimeout(() => {
                element.classList.add(`animate-${animationType}`);
            }, delay);
        }
    });
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add scroll listener for scroll-based animations
window.addEventListener('scroll', throttle(animateOnScroll, 100), { passive: true });

/**
 * Throttle function for performance
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

// Export animation functions
window.AmiraAnimations = {
    initializeAdvancedAnimations,
    initializeInteractiveAnimations,
    initializeCursorEffects,
    triggerStaggeredAnimation,
    animateTextReveal,
    createRippleEffect,
    animateOnScroll
};