document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const filterButtons = document.querySelectorAll('.filter-btn');

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  const lightboxImg = document.createElement('img');
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightbox.classList.add('show');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      lightbox.classList.remove('show');
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      galleryItems.forEach((item) => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.style.display = matches ? 'block' : 'none';
      });
    });
  });
});
