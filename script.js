/**
 * ZEBULON ONLINE - B2B Lead Generation Specialist
 * Pure JavaScript - No Frameworks
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                mobileMenu.innerHTML = `
                    <ul>
                        <li><a href="#home">HOME</a></li>
                        <li><a href="#about">ABOUT</a></li>
                        <li><a href="#services">SERVICE</a></li>
                        <li><a href="#contact">CONTACT</a></li>
                        <li><a href="#blog">BLOG</a></li>
                    </ul>
                `;
                
                // Add styles
                mobileMenu.style.cssText = `
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 2rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    z-index: 999;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                `;
                
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.style.cssText = `
                        display: block;
                        padding: 1rem 0;
                        color: #1f2937;
                        font-weight: 500;
                        border-bottom: 1px solid #e5e5e5;
                        transition: all 0.3s ease;
                    `;
                    
                    // Close mobile menu when link is clicked
                    link.addEventListener('click', function() {
                        if (mobileToggle.classList.contains('active')) {
                            mobileToggle.click();
                        }
                    });
                });
                
                document.body.appendChild(mobileMenu);
            }
            
            if (this.classList.contains('active')) {
                mobileMenu.style.transform = 'translateY(0)';
                mobileMenu.style.opacity = '1';
            } else {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
            }
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileToggle && mobileToggle.classList.contains('active')) {
                    mobileToggle.click();
                }
            }
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ============================================
    // SCROLL REVEAL ANIMATION - Enhanced
    // ============================================
    const revealElements = document.querySelectorAll('.service-card, .story-card, .reveal-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // ============================================
    // SMOOTH NAVBAR BACKGROUND ON SCROLL
    // ============================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 255, 0.05)';
        }
    });
    
    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ============================================
    // PERFORMANCE: DEBOUNCE SCROLL EVENTS
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    window.addEventListener('scroll', debounce(highlightNavLink, 10));
    window.addEventListener('scroll', debounce(revealOnScroll, 50));
    
    console.log('🚀 Zebulon Online - B2B Lead Generation Specialist - Website Loaded Successfully!');
});
