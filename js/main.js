// ============================================
// TRAVERSE ETHIOPIA TOURS - MAIN JAVASCRIPT
// Real Ethiopia image replacement and site interactions
// ============================================

const ETHIOPIA_IMAGES = {
    lalibela: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bet_Giyorgis_Lalibela.jpg',
    omo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hamar_woman_2.jpg',
    mursi: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mursi_women_Ethiopia_2009_006.jpg',
    bale: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bale_Mountains_National_Park%2C_not_forgotten%2C_Ethiopia_%2844209345805%29.jpg',
    wolf: 'https://commons.wikimedia.org/wiki/Special:FilePath/Canis_simensis_%28Ethiopian_Wolf%29_01.jpg',
    bird: 'https://commons.wikimedia.org/wiki/Special:FilePath/Streptopelia_decipiens_-Ethiopia-8.jpg',
    danakil: 'https://commons.wikimedia.org/wiki/Special:FilePath/Danakil_Depression_%28Ethiopia%29_-_2014-03-12_-_13.11.10.jpg',
    simien: 'https://commons.wikimedia.org/wiki/Special:FilePath/Simien_Mountains_Landscape%2C_Ethiopia_-_Diliff.jpg',
    gondar: 'https://commons.wikimedia.org/wiki/Special:FilePath/Fasil_Ghebbi%2C_the_royal_enclosure_of_Gondar%2C_Ethiopia_%28cropped%29.jpg',
    axum: 'https://commons.wikimedia.org/wiki/Special:FilePath/Axum_Obelisk_1.jpg',
    addis: 'https://commons.wikimedia.org/wiki/Special:FilePath/Addis_Ababa%2C_Ethiopia._%2832201336977%29.jpg'
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
        // Also remove the remaining generated avatar images, even where the old alt
        // text was generic. The replacement is an actual Ethiopia photograph.
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
