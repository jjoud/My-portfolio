document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navbar.classList.toggle('menu-open');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-open');
            });
        });
    }

    // --- Elegant Scroll-Reveal Automation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initially for hero visibility

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
            
            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetNavLink.classList.add('active');
                } else {
                    targetNavLink.classList.remove('active');
                }
            }
        });
    });

    // --- Animated Metric Counter Implementation ---
    const metricsNumbers = document.querySelectorAll('.metric-num');
    let countersStarted = false;

    const startCounters = () => {
        metricsNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 40; // Control speed here
            
            const updateCount = () => {
                const count = +counter.innerText.replace('+', '').replace('%', '');
                if (count < target) {
                    let nextVal = Math.ceil(count + increment);
                    if (nextVal > target) nextVal = target;
                    
                    // Format appropriately based on custom metric parameters
                    if (target === 5 || target === 20) {
                        counter.innerText = `${nextVal}+`;
                    } else if (target === 400) {
                        counter.innerText = `${nextVal}+`;
                    } else if (target === 77) {
                        counter.innerText = `${nextVal}.44%`;
                    } else {
                        counter.innerText = nextVal;
                    }
                    setTimeout(updateCount, 25);
                }
            };
            updateCount();
        });
    };

    // Trigger counters only when visible in view window
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    startCounters();
                    countersStarted = true;
                }
            });
        }, { threshold: 0.4 });
        countObserver.observe(metricsSection);
    }
});