// ===== Loader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1200);
});

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top = mouseY - 4 + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effect
document.querySelectorAll('a, button, .project-row, .bento-card').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('nav-hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll(
    '.section-header, .project-row, .about-col, .bento-card, .contact-left, .contact-form'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Stat Counter =====
const statNums = document.querySelectorAll('.stat-num');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCount(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

function animateCount(el, target) {
    let current = 0;
    const step = target / (1200 / 16);
    function tick() {
        current += step;
        if (current >= target) {
            el.textContent = target;
            return;
        }
        el.textContent = Math.floor(current);
        requestAnimationFrame(tick);
    }
    tick();
}

// ===== Certificate Slider =====
(function () {
    const track = document.getElementById('cert-slider');
    const slides = track.querySelectorAll('.cert-slide');
    let current = 0;

    function slideWidth() {
        return slides[0].offsetWidth + 24;
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, slides.length - 1));
        track.style.transform = `translateX(-${current * slideWidth()}px)`;
    }

    document.getElementById('cert-next').addEventListener('click', () => goTo(current + 1));
    document.getElementById('cert-prev').addEventListener('click', () => goTo(current - 1));

    slides.forEach(slide => {
        slide.addEventListener('click', () => window.open(slide.dataset.href, '_blank'));
    });
})();

// ===== Contact Form =====
document.getElementById('send-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = `mailto:sujalnayak210@gmail.com?subject=${subject}&body=${body}`;
    } else {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=sujalnayak210@gmail.com&su=${subject}&body=${body}`, '_blank');
    }
});