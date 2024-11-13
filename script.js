// Custom cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
// Typing effect
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Web Developer', 'Designer', 'Creative Thinker'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }

    // Add random "glitch" effect occasionally
    if (Math.random() < 0.01) {
        typedTextSpan.style.transform = `translateX(${Math.random() * 5}px)`;
        setTimeout(() => {
            typedTextSpan.style.transform = 'translateX(0)';
        }, 50);
    }
}

// Start typing effect
type();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('section');

function reveal() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Update cursor behavior
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, button');

links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});
// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Enhanced reveal animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card, .skill').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-content', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out'
});

// Skill Cards Animation
gsap.utils.toArray('.skill').forEach((skill, i) => {
    gsap.from(skill, {
        scrollTrigger: {
            trigger: skill,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        delay: i * 0.1
    });
});

// Growth Cards Animation
gsap.utils.toArray('.growth-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse',
            markers: false
        },
        duration: 1.2,
        opacity: 0,
        y: 50,
        rotateX: 15,
        delay: i * 0.2,
        ease: "power4.out"
    });
});

// Progress Bars Animation
function animateProgress() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const progressBar = bar.querySelector('.progress');
        
        gsap.to(progressBar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            width: `${progress}%`,
            duration: 2,
            ease: "elastic.out(1, 0.3)",
            onStart: () => {
                bar.classList.add('animated');
                gsap.to(bar, {
                    scale: 1.05,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1
                });
            },
            onComplete: () => {
                gsap.to(progressBar, {
                    backgroundColor: 'var(--accent-color)',
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Add number counting animation for progress bars
function animateNumbers() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = parseInt(bar.getAttribute('data-progress'));
        const numberDisplay = bar.querySelector('.number-display');
        
        gsap.to({ val: 0 }, {
            val: progress,
            duration: 2,
            scrollTrigger: {
                trigger: bar,
                start: 'top bottom-=100'
            },
            onUpdate: function() {
                if (numberDisplay) {
                    numberDisplay.textContent = Math.round(this.targets()[0].val) + '%';
                }
            },
            ease: "power2.out"
        });
    });
}

// Call both animations
animateProgress();
animateNumbers();

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && 
        !hamburger.contains(e.target) && 
        navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 760 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// 3D Footer Effect
document.addEventListener('mousemove', e => {
    const footer = document.querySelector('.footer-3d');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    footer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Update the GSAP animations for the name
gsap.set('.glitch', {
    transformOrigin: 'center center'
});

let tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 2
});

tl.from('.glitch', {
    duration: 1.5,
    scale: 0.1,
    opacity: 0,
    rotation: 360,
    ease: "elastic.out(1, 0.3)"
})
.to('.glitch', {
    duration: 0.2,
    skewX: 20,
    ease: "power3.inOut",
    yoyo: true,
    repeat: 3
})
.to('.glitch', {
    duration: 0.1,
    scale: 1.1,
    ease: "power4.inOut",
    yoyo: true,
    repeat: 1
});

// Add hover effect
const glitchText = document.querySelector('.glitch');
glitchText.addEventListener('mouseenter', () => {
    gsap.to('.glitch', {
        duration: 0.3,
        scale: 1.1,
        textShadow: '0 0 20px var(--accent-color)',
        ease: "power2.out"
    });
});

glitchText.addEventListener('mouseleave', () => {
    gsap.to('.glitch', {
        duration: 0.3,
        scale: 1,
        textShadow: 'none',
        ease: "power2.in"
    });
});

// Add random glitch effect
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance of glitch
        gsap.to('.glitch', {
            duration: 0.1,
            skewX: 'random(-20, 20)',
            skewY: 'random(-10, 10)',
            scale: 'random(0.95, 1.05)',
            onComplete: () => {
                gsap.to('.glitch', {
                    duration: 0.1,
                    skewX: 0,
                    skewY: 0,
                    scale: 1
                });
            }
        });
    }
}, 2000);

// Track mouse position for glow effect
document.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Enhanced GSAP animations with 3D effect
gsap.to('.hero-content', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    perspective: 1000,
    rotateX: 10,
    scale: 0.9,
    opacity: 0.8
});

// Add floating animation to skills
gsap.utils.toArray('.skill').forEach(skill => {
    gsap.to(skill, {
        y: 'random(-10, 10)',
        duration: 'random(1.5, 2.5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});

