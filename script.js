document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scrolling for Navigation Links
    // This makes clicking the navigation links scroll smoothly to the section
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default jump behavior
            e.preventDefault();
            
            // Get the target section's ID from the href attribute
            const targetId = this.getAttribute('href');
            
            // If it's a hash link, scroll to it
            if(targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 2. Intersection Observer for Fade-In Animations
    // This code makes the glass panels fade and slide up when you scroll down to them
    
    // Add initial CSS classes to panels via JS so that if JS is disabled, they are still visible
    const cards = document.querySelectorAll('.glass-panel');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Create the observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the card is in the viewport
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once it's visible
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        // Trigger when 10% of the card is visible
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Tell observer to watch all cards
    cards.forEach(card => {
        fadeObserver.observe(card);
    });

    // 3. Mouse Glow Effect
    const mouseGlow = document.getElementById('mouse-glow');
    if (mouseGlow) {
        // Show the glow only after the first mouse movement
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                mouseGlow.style.left = `${e.clientX}px`;
                mouseGlow.style.top = `${e.clientY}px`;
                mouseGlow.style.opacity = '1'; // Ensure it becomes visible
            });
        });
    }

});
