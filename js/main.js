// ============================================
// TRAVERSE ETHIOPIA TOURS - MAIN JAVASCRIPT
// Ethiopia image replacement and site interactions
// ============================================

const ETHIOPIA_IMAGES = {
    bale: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Bale_mountains.jpg',
    omo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hamar_woman.jpg',
    lalibela: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    danakil: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
    simien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    addis: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=1200&q=80',
    awash: 'https://images.unsplash.com/photo-1516028939444-5c1e6f7f7c1e?w=1200&q=80',
    rift: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Bale_mountains.jpg'
};

function imageFor(alt) {
    const text = (alt || '').toLowerCase();
    if (text.includes('bale')) return ETHIOPIA_IMAGES.bale;
    if (text.includes('mursi') || text.includes('omo') || text.includes('hamer') || text.includes('tribe') || text.includes('culture')) return ETHIOPIA_IMAGES.omo;
    if (text.includes('lalibela') || text.includes('church')) return ETHIOPIA_IMAGES.lalibela;
    if (text.includes('simien') || text.includes('mountain')) return ETHIOPIA_IMAGES.simien;
    if (text.includes('danakil')) return ETHIOPIA_IMAGES.danakil;
    if (text.includes('awash')) return ETHIOPIA_IMAGES.awash;
    if (text.includes('rift') || text.includes('lake') || text.includes('bird')) return ETHIOPIA_IMAGES.rift;
    if (text.includes('addis')) return ETHIOPIA_IMAGES.addis;
    if (text.includes('complete') || text.includes('ultimate')) return ETHIOPIA_IMAGES.bale;
    return null;
}

function makeImageReliable(img, replacement) {
    const isRemoteStockImage = /unsplash\.com|pravatar\.cc/i.test(img.src);
    const source = replacement || (isRemoteStockImage ? ETHIOPIA_IMAGES.fallback : null);
    if (!source) return;

    img.onerror = function () {
        if (img.src !== ETHIOPIA_IMAGES.fallback) {
            img.onerror = null;
            img.src = ETHIOPIA_IMAGES.fallback;
        }
    };
    img.src = source;
    img.removeAttribute('srcset');
    img.loading = img.loading || 'lazy';
}

function useRealEthiopiaImages() {
    document.querySelectorAll('img').forEach((img) => {
        makeImageReliable(img, imageFor(img.alt));
    });
}
