// ========================================
// SCROLL PROGRESS BAR
// ========================================
window.addEventListener('scroll', function() {
    const scrollProgress = document.getElementById('scrollProgress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ========================================
// IMAGE LOADING (Profile & About)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Profile Image
    const profileImg = document.getElementById('profileImg');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    profileImg.addEventListener('load', function() {
        this.classList.add('loaded');
        profilePlaceholder.classList.add('hidden');
    });
    
    profileImg.addEventListener('error', function() {
        // Jika gambar gagal load, tetap tampilkan placeholder
        console.log('Profile image not found, showing placeholder');
    });
    
    // About Image
    const aboutImg = document.getElementById('aboutImg');
    const aboutPlaceholder = document.getElementById('aboutPlaceholder');
    
    aboutImg.addEventListener('load', function() {
        this.classList.add('loaded');
        aboutPlaceholder.classList.add('hidden');
    });
    
    aboutImg.addEventListener('error', function() {
        console.log('About image not found, showing placeholder');
    });
});

// ========================================
// THEME TOGGLE SWITCH (DARK/LIGHT MODE)
// ========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Set initial toggle state
if (currentTheme === 'light') {
    themeToggle.classList.add('active');
}

// Toggle theme
themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle switch animation
    if (newTheme === 'light') {
        this.classList.add('active');
    } else {
        this.classList.remove('active');
    }
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu ketika hamburger diklik
hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animasi hamburger jadi X
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu ketika link diklik
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========================================
// SMOOTH SCROLL WITH OFFSET
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state
document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Trigger reveal on load
    revealOnScroll();
});

// Trigger reveal on scroll
window.addEventListener('scroll', revealOnScroll);

// ========================================
// TYPING EFFECT FOR HERO TAGLINE
// ========================================
function typeWriter() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    let i = 0;
    const speed = 50;
    
    function type() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Delay sebelum mulai typing
    setTimeout(type, 500);
}

// Run typing effect on page load
window.addEventListener('load', typeWriter);

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `&copy; ${currentYear} Raihan Darma Putra. Built with passion and code.`;
    }
});

// ========================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ========================================
// Create scroll to top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = 'scroll-to-top';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 20px rgba(99, 102, 241, 0.3);
`;

document.body.appendChild(scrollBtn);

// Show/hide scroll button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
    }
});

// Scroll to top when clicked
scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll button
scrollBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.4)';
});

scrollBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 5px 20px rgba(99, 102, 241, 0.3)';
});

// ========================================
// PARTICLE BACKGROUND EFFECT (OPTIONAL)
// ========================================
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
}

// Uncomment line dibawah untuk aktifkan particles
// createParticles();

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c👋 Hello Developer!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Portfolio built by Raihan Darma Putra', 'color: #8b5cf6; font-size: 14px;');
console.log('%c💻 Interested in the code? Check out my GitHub!', 'color: #cbd5e1; font-size: 12px;');

// ========================================
// PERFORMANCE: LAZY LOADING IMAGES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});