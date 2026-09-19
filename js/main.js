// ============================================
// TRAVERSE ETHIOPIA TOURS - MAIN JAVASCRIPT
// Real Ethiopia image replacement and site interactions
// ============================================

const ETHIOPIA_IMAGES = {
    lalibela: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    omo: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=80',
    mursi: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=80',
    bale: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1200&q=80',
    wolf: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1200&q=80',
    bird: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    danakil: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
    simien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    gondar: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
    axum: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    addis: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=1200&q=80'
};

function imageFor(alt) {
    const text = (alt || '').toLowerCase();
    if (text.includes('lalibela') || text.includes('church')) return ETHIOPIA_IMAGES.lalibela;
    if (text.includes('mursi')) return ETHIOPIA_IMAGES.mursi;
    if (text.includes('omo') || text.includes('hamer') || text.includes('tribe') || text.includes('culture')) return ETHIOPIA_IMAGES.omo;
    if (text.includes('wolf')) return ETHIOPIA_IMAGES.wolf;
    if (text.includes('bird') || text.includes('awash') || text.includes('rift') || text.includes('lake')) return ETHIOPIA_IMAGES.bird;
    if (text.includes('bale')) return ETHIOPIA_IMAGES.bale;
    if (text.includes('danakil')) return ETHIOPIA_IMAGES.danakil;
    if (text.includes('simien') || text.includes('mountain')) return ETHIOPIA_IMAGES.simien;
    if (text.includes('gondar')) return ETHIOPIA_IMAGES.gondar;
    if (text.includes('axum')) return ETHIOPIA_IMAGES.axum;
    if (text.includes('addis')) return ETHIOPIA_IMAGES.addis;
    if (text.includes('guide') || text.includes('team')) return ETHIOPIA_IMAGES.addis;
    return null;
}

function useRealEthiopiaImages() {
    document.querySelectorAll('img').forEach((img) => {
        const replacement = imageFor(img.alt);
        if (replacement || img.src.includes('unsplash.com') || img.src.includes('pravatar.cc')) {
            img.src = replacement || ETHIOPIA_IMAGES.addis;
            img.removeAttribute('srcset');
            img.loading = img.loading || 'lazy';
        }
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
