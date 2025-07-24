document.addEventListener('DOMContentLoaded', function() {
    // Active navigation
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Animation for logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(-5deg)';
        });
        
        logo.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(0)';
        });
    }
});