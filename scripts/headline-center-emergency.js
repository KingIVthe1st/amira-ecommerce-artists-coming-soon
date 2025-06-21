// Emergency headline centering JavaScript
// This ensures the headline is centered even if CSS fails

document.addEventListener('DOMContentLoaded', function() {
    // Target the hero title and its children
    const heroTitle = document.querySelector('.hero-title');
    const titleLines = document.querySelectorAll('.title-line');
    
    if (heroTitle) {
        // Force centering styles
        heroTitle.style.textAlign = 'center';
        heroTitle.style.display = 'block';
        heroTitle.style.width = '100%';
        heroTitle.style.margin = '0 auto';
        heroTitle.style.marginBottom = 'var(--space-lg)';
    }
    
    // Center each title line
    titleLines.forEach(line => {
        line.style.display = 'block';
        line.style.textAlign = 'center';
        line.style.width = '100%';
        line.style.margin = '0 auto';
    });
    
    // Log confirmation
    console.log('Headline centering applied via JavaScript');
});
