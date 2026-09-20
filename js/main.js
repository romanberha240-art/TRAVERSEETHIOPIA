const ETHIOPIA_IMAGES = {
  bale: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Bale_mountains.jpg',
  omo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hamar_woman.jpg',
  lalibela: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
  danakil: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
  simien: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
  addis: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=1200&q=80',
  awash: 'https://images.unsplash.com/photo-1516028939444-5c1e6f7f7c1e?w=1200&q=80',
  fallback: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Bale_mountains.jpg'
};

function imageFor(alt = '') {
  const text = alt.toLowerCase();
  if (text.includes('bale')) return ETHIOPIA_IMAGES.bale;
  if (/mursi|omo|hamer|tribe|culture/.test(text)) return ETHIOPIA_IMAGES.omo;
  if (/lalibela|church/.test(text)) return ETHIOPIA_IMAGES.lalibela;
  if (/simien|mountain/.test(text)) return ETHIOPIA_IMAGES.simien;
  if (text.includes('danakil')) return ETHIOPIA_IMAGES.danakil;
  if (text.includes('awash')) return ETHIOPIA_IMAGES.awash;
  if (/rift|lake|bird/.test(text)) return ETHIOPIA_IMAGES.rift || ETHIOPIA_IMAGES.bale;
  if (text.includes('addis')) return ETHIOPIA_IMAGES.addis;
  return null;
}

function makeImageReliable(img, replacement) {
  if (!img) return;
  const fallback = ETHIOPIA_IMAGES.fallback;
  if (replacement && (!img.getAttribute('src') || /unsplash|pravatar/i.test(img.src))) img.src = replacement;
  img.removeAttribute('srcset');
  img.loading = img.loading || 'lazy';
  img.addEventListener('error', () => {
    if (img.src !== fallback) {
      img.src = fallback;
      img.removeAttribute('srcset');
    }
  }, { once: true });
}

function setupNavigation() {
  const header = document.querySelector('.header');
  const menu = document.getElementById('navMenu');
  const toggle = document.getElementById('menuToggle');
  const setScrolled = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });
  if (!menu || !toggle) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
}

function setupContactForms() {
  document.querySelectorAll('#contactForm').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';
    const button = form.querySelector('button[type="submit"]');
    const status = document.createElement('p');
    status.className = 'form-status';
    status.setAttribute('role', 'status');
    form.append(status);
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const payload = Object.fromEntries(new FormData(form).entries());
      form.querySelectorAll('input, select, textarea').forEach((field) => { if (field.id) payload[field.id] = field.value.trim(); });
      button.disabled = true;
      status.className = 'form-status is-loading';
      status.textContent = 'Sending your request…';
      try {
        const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to send request');
        status.className = 'form-status is-success';
        status.textContent = result.message || 'Thanks — your request has been received.';
        form.reset();
      } catch (error) {
        status.className = 'form-status is-error';
        status.textContent = error.message || 'Something went wrong. Please contact us on WhatsApp.';
      } finally { button.disabled = false; }
    });
  });
}

function init() {
  setupNavigation();
  setupContactForms();
  document.querySelectorAll('img').forEach((img) => makeImageReliable(img, imageFor(img.alt || img.dataset.alt || '')));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
