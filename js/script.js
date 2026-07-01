document.addEventListener('DOMContentLoaded', function() {
    const html = document.documentElement;
    const navbar = document.querySelector('.navbar');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.querySelector('.contact-form');
    const hero = document.querySelector('.hero');

    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    const skillCards = document.querySelectorAll('.skill-card, .project-card, .stat');
    const buttons = document.querySelectorAll('.btn');
    const socialLinks = document.querySelectorAll('.social-links a');
    const projectCards = document.querySelectorAll('.project-card');

    let maxScroll = 0;

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            const offset = document.querySelector(target).offsetTop - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    function updateActiveNav() {
        const scrollTop = window.scrollY + 100;
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                const id = section.getAttribute('id');
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll', {
                    event_category: 'engagement',
                    event_label: scrollPercent + '%'
                });
            }
        }

        if (scrollTop > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        animateOnScroll();
    });

    hero.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--mouse-x', x + '%');
        hero.style.setProperty('--mouse-y', y + '%');
        hero.style.setProperty('--mouse-x-inv', (100 - x) + '%');
        hero.style.setProperty('--mouse-y-inv', (100 - y) + '%');
    });

    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'engagement',
                    event_label: buttonText
                });
            }
        });
    });

    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon) {
                const platform = icon.getAttribute('class').split(' ')[1].replace('fa-', '');
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'social',
                        event_label: platform
                    });
                }
            }
        });
    });

    projectCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3');
            if (title && typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'projects',
                    event_label: title.textContent
                });
            }
        });
    });

    function animateOnScroll() {
        skillCards.forEach(function(el) {
            const elementTop = el.offsetTop;
            const windowBottom = window.scrollY + window.innerHeight;
            if (elementTop < windowBottom - 50) {
                el.classList.add('fade-in-up');
            }
        });
    }

    animateOnScroll();

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[name="email"]');
            const nameInput = this.querySelector('input[name="name"]');
            const subjectInput = this.querySelector('input[name="subject"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            const submitBtn = this.querySelector('button[type="submit"]');

            const email = emailInput.value;
            const name = nameInput.value;
            const subject = subjectInput.value;
            const message = messageInput.value;

            if (!name || typeof name !== 'string' || !name.trim()) {
                alert('Please enter your name.');
                return;
            }
            if (!email || typeof email !== 'string' || !isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            if (!subject || typeof subject !== 'string' || !subject.trim()) {
                alert('Please enter a subject.');
                return;
            }
            if (!message || typeof message !== 'string' || !message.trim()) {
                alert('Please enter a message.');
                return;
            }

            const formData = new FormData(this);
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            fetch(this.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.ok) {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#10b981';
                    contactForm.reset();
                    setTimeout(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(function(error) {
                console.error('Error:', error);
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.style.background = '#ef4444';
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'navigation',
                event_label: 'back-to-top'
            });
        }
    });
});
