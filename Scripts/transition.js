// transition.js
document.addEventListener('DOMContentLoaded', () => {
    // When a user clicks any navigation link...
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');
            
            // Ignore if it's just an in-page anchor (like #about)
            if (targetUrl.startsWith('#')) return;

            // About from external pages should not fire the page transition curtain.
            if (targetUrl.includes('index.html#about')) {
                return; // Use browser default immediate navigation
            }

            // Stop the browser from instantly changing the page
            e.preventDefault();

            // Pull the curtain up!
            const curtain = document.getElementById('page-transition-curtain');
            if(curtain) {
                curtain.classList.add('curtain-active');
            }

            // Wait for the curtain animation to finish (0.6s), then navigate
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    });
});

