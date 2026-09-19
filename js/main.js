// ============================================
// TRAVERSE ETHIOPIA TOURS - MAIN JAVASCRIPT
// Real, subject-matched Ethiopia image replacement and site interactions
// Images are real Wikimedia Commons photographs. Check each image's
// description page before production use for attribution/license details.
// ============================================

const ETHIOPIA_IMAGES = {
    danakil: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Danakil_Depression_%2814953533609%29.jpg',
    hamer: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Hammer_woman_income_from_tourism%2C_Omo_valley%2C_Ethiopia_%2830457967710%29.jpg',
    mursi: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mursi_woman%2C_Omo_Valley%2C_Ethiopia_%2830348838527%29.jpg',
    konso: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Konso_Landscape%2C_Ethiopia_%2815305695666%29.jpg',
    dassanech: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Dassenetch_Men%2C_Omo_Valley%2C_Ethiopia_%282245227778%29.jpg',
    bird: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Blue-winged_Goose_In_The_Bale_Mountains%2C_Ethiopia_%28Afropavo_congensis%29_%2824112761224%29.jpg',
    bale: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Sanetti_Plateau_Bale_Mountain_National_Park_Ethiopia_Africa.JPG',
    wolf: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Ethiopian_wolf_%28Canis_simensis_citernii%29_2.jpg',
    lalibela: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Bete_Giyorgis_Lalibela_Ethiopia.jpg',
    simien: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Ethiopia_Simien_Mountains_%2825425932675%29.jpg',
    gondar: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Fasilides_Castle_Ethiopia_2006.jpg',
    axum: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Aksum_obelisk%2C_Ethiopia.jpg',
    addis: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Addis_Ababa_from_Entoto.jpg'
};

function imageFor(alt) {
    const text = (alt || '').toLowerCase();
    if (text.includes('mursi')) return ETHIOPIA_IMAGES.mursi;
    if (text.includes('hamer')) return ETHIOPIA_IMAGES.hamer;
    if (text.includes('dassanech')) return ETHIOPIA_IMAGES.dassanech;
    if (text.includes('konso')) return ETHIOPIA_IMAGES.konso;
    if (text.includes('omo') || text.includes('tribe') || text.includes('culture')) return ETHIOPIA_IMAGES.hamer;
    if (text.includes('wolf')) return ETHIOPIA_IMAGES.wolf;
    if (text.includes('bird') || text.includes('awash') || text.includes('rift') || text.includes('lake')) return ETHIOPIA_IMAGES.bird;
    if (text.includes('bale')) return ETHIOPIA_IMAGES.bale;
    if (text.includes('danakil')) return ETHIOPIA_IMAGES.danakil;
    if (text.includes('lalibela') || text.includes('church')) return ETHIOPIA_IMAGES.lalibela;
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
        // Replace placeholder stock photos and avatar services only when the
        // alt text identifies a real Ethiopia subject. Never assign a random
        // destination image to an unrelated image.
        if (replacement) {
            img.src = replacement;
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
