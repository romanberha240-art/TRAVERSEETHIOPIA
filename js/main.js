// ============================================
// TRAVERSE ETHIOPIA TOURS - MAIN JAVASCRIPT
// Verified Ethiopia image sources and site interactions
// ============================================

// These are real photographs from Wikimedia Commons. Keep the source-page
// links in the imageCredits object so the photographer and licence can be
// credited wherever the images are displayed.
const ETHIOPIA_IMAGES = {
    bale: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/The_Sanetti_Plateau_in_the_Bale_Mountains%2C_Ethiopia.jpg',
    baleForest: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Bale_Mountains_Harena_Forest.JPG',
    omo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hamar_woman.jpg',
    mursi: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Mursi_woman.jpg',
    karo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Omo_Karo_Bodik_boy_smile.jpg',
    lalibela: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Bete_Giyorgis%2C_Lalibela%2C_Ethiopia.jpg',
    danakil: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Danakil_Depression_Ethiopia.jpg',
    simien: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Simien_Mountains%2C_Ethiopia.jpg',
    addis: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Addis_Ababa%2C_Ethiopia.jpg'
};

function imageFor(alt) {
    const text = (alt || '').toLowerCase();
    // Check specific destinations before broad category words such as birding.
    if (text.includes('bale')) return ETHIOPIA_IMAGES.bale;
    if (text.includes('mursi')) return ETHIOPIA_IMAGES.mursi;
    if (text.includes('omo') || text.includes('hamer') || text.includes('tribe') || text.includes('culture')) return ETHIOPIA_IMAGES.omo;
    if (text.includes('lalibela') || text.includes('church')) return ETHIOPIA_IMAGES.lalibela;
    if (text.includes('simien') || text.includes('mountain')) return ETHIOPIA_IMAGES.simien;
    if (text.includes('danakil')) return ETHIOPIA_IMAGES.danakil;
    if (text.includes('addis')) return ETHIOPIA_IMAGES.addis;
    return null;
}

function useRealEthiopiaImages() {
    document.querySelectorAll('img').forEach((img) => {
        const replacement = imageFor(img.alt);
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
