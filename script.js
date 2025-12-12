const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

const PARTICLE_COUNT = 50;
const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * bgCanvas.width;
        this.y = Math.random() * bgCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > bgCanvas.width) this.x = 0;
        if (this.x < 0) this.x = bgCanvas.width;
        if (this.y > bgCanvas.height) this.y = 0;
        if (this.y < 0) this.y = bgCanvas.height;
    }

    draw() {
        bgCtx.fillStyle = 'rgba(34, 211, 238, 0.5)';
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.fill();
    }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function animateBackground() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    
    const gradient = bgCtx.createLinearGradient(0, 0, bgCanvas.width, bgCanvas.height);
    gradient.addColorStop(0, 'rgba(17, 24, 39, 1)');
    gradient.addColorStop(0.5, 'rgba(31, 41, 55, 1)');
    gradient.addColorStop(1, 'rgba(17, 24, 39, 1)');
    bgCtx.fillStyle = gradient;
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                bgCtx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - distance / 100)})`;
                bgCtx.lineWidth = 1;
                bgCtx.beginPath();
                bgCtx.moveTo(a.x, a.y);
                bgCtx.lineTo(b.x, b.y);
                bgCtx.stroke();
            }
        });
    });

    requestAnimationFrame(animateBackground);
}

animateBackground();

window.addEventListener('resize', () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card, .experience-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
