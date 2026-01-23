// Modern Portfolio JavaScript
$(document).ready(function() {
    // Smooth scrolling for navigation
    $('.nav-menu a').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const offset = $(target).offset().top - 80;

        $('html, body').animate({
            scrollTop: offset
        }, 800, 'easeInOutCubic');
    });

    // Theme toggle
    $('#theme-toggle').on('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update icon
        const icon = $(this).find('i');
        if (newTheme === 'dark') {
            icon.removeClass('fa-sun').addClass('fa-moon');
        } else {
            icon.removeClass('fa-moon').addClass('fa-sun');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = $('#theme-toggle').find('i');
    if (savedTheme === 'dark') {
        icon.removeClass('fa-sun').addClass('fa-moon');
    } else {
        icon.removeClass('fa-moon').addClass('fa-sun');
    }

    // Navbar background on scroll
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        if (scrollTop > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }

        // Update active nav link
        updateActiveNav();
    });

    function updateActiveNav() {
        const scrollTop = $(window).scrollTop() + 100;
        const sections = $('section');

        sections.each(function() {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                const id = $(this).attr('id');
                $('.nav-menu a').removeClass('active');
                $(`.nav-menu a[href="#${id}"]`).addClass('active');
            }
        });
    }

    // Mouse follow effect on hero
    $('.hero').on('mousemove', function(e) {
        const mouseX = e.pageX / $(window).width();
        const mouseY = e.pageY / $(window).height();

        $('.hero::before').css({
            'background-position': `${mouseX * 100}% ${mouseY * 100}%`
        });
    });

    // Analytics event tracking
    $('.btn').on('click', function() {
        const buttonText = $(this).text().trim();
        gtag('event', 'click', {
            event_category: 'engagement',
            event_label: buttonText
        });
    });

    $('.social-links a').on('click', function() {
        const platform = $(this).find('i').attr('class').split(' ')[1].replace('fa-', '');
        gtag('event', 'click', {
            event_category: 'social',
            event_label: platform
        });
    });

    $('.project-card').on('click', function() {
        const projectTitle = $(this).find('h3').text();
        gtag('event', 'click', {
            event_category: 'projects',
            event_label: projectTitle
        });
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.skill-card, .project-card, .stat').each(function() {
            const elementTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (elementTop < windowBottom - 50) {
                $(this).addClass('fade-in-up');
            }
        });
    }

    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Scroll depth tracking
    let maxScroll = 0;
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            gtag('event', 'scroll', {
                event_category: 'engagement',
                event_label: `${scrollPercent}%`
            });
        }
    });

    // Contact form handling
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();

        submitBtn.text('Sending...').prop('disabled', true);

        fetch($(this).attr('action'), {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                submitBtn.text('Message Sent!').css('background', '#10b981');
                $(this).trigger('reset');
                setTimeout(() => {
                    submitBtn.text(originalText).css('background', '').prop('disabled', false);
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.text('Error - Try Again').css('background', '#ef4444');
            setTimeout(() => {
                submitBtn.text(originalText).css('background', '').prop('disabled', false);
            }, 3000);
        });
    });

    // Mobile menu toggle (if needed in future)
    // For now, nav is always visible on mobile
});