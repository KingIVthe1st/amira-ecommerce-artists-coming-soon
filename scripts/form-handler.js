/**
 * AMIRA RAHIM - ECOMMERCE FOR ARTISTS COMING SOON
 * Form Handler JavaScript
 */

// Initialize form handling when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEmailForm();
    console.log('Email form handler initialized');
});

/**
 * Initialize email capture form functionality
 */
function initializeEmailForm() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('.submit-btn');
    const feedback = document.getElementById('formFeedback');
    
    if (!form || !emailInput || !submitBtn || !feedback) {
        console.error('Form elements not found');
        return;
    }
    
    // Add real-time email validation
    emailInput.addEventListener('input', function() {
        validateEmail(this.value, feedback);
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(emailInput, submitBtn, feedback);
    });
    
    // Add enter key support
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
    
    console.log('Email form event listeners attached');
}

/**
 * Validate email address in real-time
 */
function validateEmail(email, feedbackElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        setFeedback(feedbackElement, '', '');
        return false;
    }
    
    if (email.length < 5) {
        setFeedback(feedbackElement, 'Email too short', 'error');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        setFeedback(feedbackElement, 'Please enter a valid email address', 'error');
        return false;
    }
    
    setFeedback(feedbackElement, 'Email looks good! ✓', 'success');
    return true;
}

/**
 * Handle form submission
 */
async function handleFormSubmission(emailInput, submitBtn, feedback) {
    const email = emailInput.value.trim();
    
    // Validate email before submission
    if (!validateEmail(email, feedback)) {
        animateError(emailInput);
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    setFeedback(feedback, 'Adding you to the waitlist...', 'info');
    
    try {
        // Simulate API call (replace with actual endpoint)
        const success = await submitEmailToWaitlist(email);
        
        if (success) {
            handleSuccessfulSubmission(emailInput, submitBtn, feedback);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        handleSubmissionError(submitBtn, feedback);
    }
}

/**
 * Simulate email submission to waitlist
 * Replace this with actual API integration
 */
async function submitEmailToWaitlist(email) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, always return success
    // In production, this would make an actual API call to your email service
    console.log(`Email submitted: ${email}`);
    
    // Example of what the real implementation might look like:
    /*
    const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    });
    
    return response.ok;
    */
    
    return true; // Always succeed for demo
}

/**
 * Handle successful form submission
 */
function handleSuccessfulSubmission(emailInput, submitBtn, feedback) {
    setLoadingState(submitBtn, false);
    setFeedback(feedback, 'Welcome to the waitlist! Check your email for confirmation.', 'success');
    
    // Clear the input
    emailInput.value = '';
    
    // Show success animation
    animateSuccess(submitBtn);
    
    // Track conversion (for analytics)
    trackWaitlistSignup();
    
    // Reset form after delay
    setTimeout(() => {
        setFeedback(feedback, '', '');
        resetSubmitButton(submitBtn);
    }, 5000);
}

/**
 * Handle submission error
 */
function handleSubmissionError(submitBtn, feedback) {
    setLoadingState(submitBtn, false);
    setFeedback(feedback, 'Something went wrong. Please try again.', 'error');
    
    // Reset feedback after delay
    setTimeout(() => {
        setFeedback(feedback, '', '');
    }, 5000);
}

/**
 * Set feedback message with appropriate styling
 */
function setFeedback(element, message, type) {
    element.textContent = message;
    element.className = `form-feedback ${type}`;
    
    if (message) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    } else {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
    }
}

/**
 * Set loading state for submit button
 */
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.querySelector('.btn-text').textContent = 'Joining...';
        button.querySelector('.btn-arrow').style.display = 'none';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        button.querySelector('.btn-text').textContent = 'Join Waitlist';
        button.querySelector('.btn-arrow').style.display = 'inline';
    }
}

/**
 * Reset submit button to original state
 */
function resetSubmitButton(button) {
    button.classList.remove('loading');
    button.disabled = false;
    button.querySelector('.btn-text').textContent = 'Join Waitlist';
    button.querySelector('.btn-arrow').style.display = 'inline';
}

/**
 * Animate input field on error
 */
function animateError(input) {
    input.style.animation = 'shake 0.5s ease-in-out';
    input.style.borderColor = '#f87171';
    
    setTimeout(() => {
        input.style.animation = '';
        input.style.borderColor = '';
    }, 500);
}

/**
 * Animate button on success
 */
function animateSuccess(button) {
    button.style.animation = 'pulse 0.6s ease-in-out';
    
    setTimeout(() => {
        button.style.animation = '';
    }, 600);
}

/**
 * Track waitlist signup for analytics
 */
function trackWaitlistSignup() {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'waitlist_signup', {
            event_category: 'engagement',
            event_label: 'ecommerce_for_artists',
            value: 1
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Ecommerce for Artists Waitlist',
            content_category: 'Education'
        });
    }
    
    // Custom analytics tracking
    if (window.analytics) {
        window.analytics.track('Waitlist Signup', {
            program: 'Ecommerce for Artists',
            page: 'Coming Soon',
            timestamp: new Date().toISOString()
        });
    }
    
    console.log('Waitlist signup tracked');
}

/**
 * Validate form accessibility
 */
function validateFormAccessibility() {
    const form = document.getElementById('emailForm');
    const emailInput = document.getElementById('email');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Ensure proper ARIA attributes
    if (!emailInput.getAttribute('aria-label')) {
        emailInput.setAttribute('aria-label', 'Email address for waitlist');
    }
    
    if (!submitBtn.getAttribute('aria-label')) {
        submitBtn.setAttribute('aria-label', 'Join waitlist');
    }
    
    // Ensure proper form labeling
    if (!emailInput.getAttribute('aria-describedby')) {
        emailInput.setAttribute('aria-describedby', 'formFeedback');
    }
    
    console.log('Form accessibility validated');
}

/**
 * Initialize form keyboard navigation
 */
function initializeKeyboardNavigation() {
    const form = document.getElementById('emailForm');
    
    form.addEventListener('keydown', function(e) {
        // Escape key clears form
        if (e.key === 'Escape') {
            const emailInput = document.getElementById('email');
            const feedback = document.getElementById('formFeedback');
            
            emailInput.value = '';
            setFeedback(feedback, '', '');
            emailInput.focus();
        }
    });
    
    console.log('Form keyboard navigation initialized');
}

// Initialize additional form features
document.addEventListener('DOMContentLoaded', function() {
    validateFormAccessibility();
    initializeKeyboardNavigation();
});

// Export functions for external use
window.AmiraFormHandler = {
    validateEmail,
    handleFormSubmission,
    submitEmailToWaitlist,
    trackWaitlistSignup,
    setFeedback,
    setLoadingState
};