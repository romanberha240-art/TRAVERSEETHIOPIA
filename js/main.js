// ============================================
// TRAVERSE ETHIOPIA TOURS - MAIN JAVASCRIPT
// Ethiopia image replacement and site interactions
// ============================================

// Wikimedia Commons file URLs are used for the Ethiopia-specific images.
// The fallback URLs ensure the cards never remain blank if Commons is
// temporarily unavailable or a file is renamed.
const ETHIOPIA_IMAGES = {
    bale: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/The_Sanetti_Plateau_in_the_Bale_Mountains%2C_Ethiopia.jpg',
    omo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hamar_woman.jpg',
    lalibela: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    danakil: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
    simien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    addis: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1200&q=80'
};

function imageFor(alt) {
    const text = (alt || '').toLowerCase();
    if (text.includes('bale')) return ETHIOPIA_IMAGES.bale;
    if (text.includes('mursi') || text.includes('omo') || text.includes('hamer') || text.includes('tribe') || text.includes('culture')) return ETHIOPIA_IMAGES.omo;
    if (text.includes('lalibela') || text.includes('church')) return ETHIOPIA_IMAGES.lalibela;
    if (text.includes('simien') || text.includes('mountain')) return ETHIOPIA_IMAGES.simien;
    if (text.includes('danakil')) return ETHIOPIA_IMAGES.danakil;
    if (text.includes('addis')) return ETHIOPIA_IMAGES.addis;
    return null;
}

function makeImageReliable(img, replacement) {
    if (!replacement) return;
    img.onerror = function () {
        // Prevent a failed remote image from leaving a blank gallery card.
        if (img.src !== ETHIOPIA_IMAGES.fallback) {
            img.onerror = null;
            img.src = ETHIOPIA_IMAGES.fallback;
        }
    };
    img.src = replacement;
    img.removeAttribute('srcset');
    img.loading = img.loading || 'lazy';
}

function useRealEthiopiaImages() {
    document.querySelectorAll('img').forEach((img) => {
        makeImageReliable(img, imageFor(img.alt));
    });
}

document.addEventListener('DOMContentLoaded', function () {
    useRealEthiopiaImages();

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const form = document.querySelector('.contact-form form');
    if (form) form.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you! Your booking request has been received. We will contact you within 24 hours.');
        form.reset();
    });
});
