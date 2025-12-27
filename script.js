// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        navbar.style.padding = '10px 0';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '20px 0';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation for stat boxes
            if (entry.target.classList.contains('stat-box')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
});

// Counter animation for stats
function animateCounter(statBox) {
    const counter = statBox.querySelector('.counter');
    if (!counter || counter.classList.contains('counted')) return;
    
    counter.classList.add('counted');
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Add active state to navigation on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Parallax effect for background particles
window.addEventListener('scroll', function() {
    const particles = document.querySelectorAll('.particle');
    const scrolled = window.pageYOffset;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
    });
});

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevels = entry.target.querySelectorAll('.skill-level');
            skillLevels.forEach(level => {
                level.style.width = level.style.getPropertyValue('--skill-percent');
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Add particle cursor effect
let particles = [];
const particleCount = 15;

document.addEventListener('mousemove', function(e) {
    if (particles.length < particleCount) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    particle.style.zIndex = '9999';
    particle.style.transition = 'all 0.5s ease-out';
    
    document.body.appendChild(particle);
    particles.push(particle);
    
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(2) translateY(-20px)';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
        particles = particles.filter(p => p !== particle);
    }, 500);
}

// Smooth reveal for cards
const cards = document.querySelectorAll('.card-hover, .card-3d, .contact-card, .cert-card, .achievement-card');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    observer.observe(card);
});

// Scroll to top button functionality
const scrollToTopBtn = document.querySelector('.footer-links a');
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add glitch effect to hero title
const glitchElement = document.querySelector('.glitch');
if (glitchElement) {
    setInterval(() => {
        glitchElement.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px rgba(255, 0, 0, 0.5),
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px rgba(0, 255, 0, 0.5),
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0px rgba(0, 0, 255, 0.5)
        `;
        
        setTimeout(() => {
            glitchElement.style.textShadow = 'none';
        }, 50);
    }, 3000);
}

// Initialize skill level widths to 0
document.querySelectorAll('.skill-level').forEach(level => {
    level.style.width = '0';
});

console.log('🎨 Portfolio loaded successfully!');
console.log('💼 Wilson Samuel - WFM Professional');
console.log('🚀 Let\'s connect!');
