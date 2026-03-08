// ========================================
// Superior Practices - Website Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to animatable elements
    const animateElements = document.querySelectorAll(
        '.solution-card, .feature-card, .info-card, .stat-card, .highlight-card, ' +
        '.result-card, .location-card, .numbered-item, .industry-half, .tab-item, ' +
        '.cvm-block, .callout-box, .integration-bar, .compliance-block, .section-header'
    );

    animateElements.forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(i % 4) * 0.1}s`;
        observer.observe(el);
    });

    // Load client logos into marquee tracks
    const track1 = document.getElementById('marqueeTrack1');
    const track2 = document.getElementById('marqueeTrack2');
    if (track1 && track2) {
        const totalLogos = 53;
        const mid = Math.ceil(totalLogos / 2);

        function populateTrack(track, start, end) {
            const fragment = document.createDocumentFragment();
            // Add logos twice for seamless loop
            for (let pass = 0; pass < 2; pass++) {
                for (let i = start; i <= end; i++) {
                    const img = document.createElement('img');
                    img.src = `assets/images/page9_img${i}.png`;
                    img.alt = 'Client logo';
                    img.loading = 'lazy';
                    img.onerror = function() { this.style.display = 'none'; };
                    fragment.appendChild(img);
                }
            }
            track.appendChild(fragment);
        }

        populateTrack(track1, 1, mid);
        populateTrack(track2, mid + 1, totalLogos);
    }

    // Try AI tab switching
    document.querySelectorAll('.try-ai-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.try-ai-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.try-ai-frame').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.target);
            if (target) target.classList.add('active');
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            const subject = encodeURIComponent('Contact from ' + (data.name || 'Website Visitor'));
            const body = encodeURIComponent(
                'Name: ' + (data.name || '') + '\n' +
                'Email: ' + (data.email || '') + '\n' +
                'Company: ' + (data.company || '') + '\n' +
                'Industry: ' + (data.industry || '') + '\n\n' +
                'Message:\n' + (data.message || '')
            );

            window.location.href = 'mailto:ai@superiorpractices.com?subject=' + subject + '&body=' + body;
        });
    }

    // Smooth scroll for anchor links (offset for fixed navbar)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
