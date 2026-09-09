// ============================================
// TRAVERSE ETHIOPIA TOURS - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
    
    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
    
    // ===== Language Switcher =====
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';
    
    // Language translations
    const translations = {
        en: {
            'nav-home': 'Home',
            'nav-tours': 'Tours',
            'nav-destinations': 'Destinations',
            'nav-gallery': 'Gallery',
            'nav-about': 'About',
            'nav-contact': 'Contact',
            'hero-title': 'Discover the Wonders of <span>Ethiopia</span>',
            'hero-subtitle': 'Expert-led birding and cultural tours in the cradle of humanity',
            'hero-cta1': 'Explore Tours',
            'hero-cta2': 'Contact Us',
            'stat-tours': 'Tours',
            'stat-birds': 'Bird Species',
            'stat-tribes': 'Tribes',
            'stat-years': 'Years Experience',
            'featured-title': 'Featured <span>Tours</span>',
            'featured-subtitle': 'Hand-crafted adventures across Ethiopia\'s most spectacular destinations',
            'destinations-title': 'Popular <span>Destinations</span>',
            'about-title': 'About <span>Traverse Ethiopia</span>',
            'contact-title': 'Get In <span>Touch</span>',
            'contact-subtitle': 'Let\'s plan your Ethiopian adventure together',
            'footer-about': 'Traverse Ethiopia offers authentic birding and cultural tours led by expert local guides.',
            'footer-tours': 'Our Tours',
            'footer-destinations': 'Destinations',
            'footer-contact': 'Contact',
            'footer-rights': 'All Rights Reserved',
            'form-name': 'Full Name',
            'form-email': 'Email Address',
            'form-phone': 'Phone Number',
            'form-tour': 'Tour Interest',
            'form-dates': 'Travel Dates',
            'form-people': 'Number of Travelers',
            'form-budget': 'Budget Range',
            'form-message': 'Special Requests',
            'form-submit': 'Send Booking Request'
        },
        am: {
            'nav-home': 'መኖሪያ',
            'nav-tours': 'ጉዞዎች',
            'nav-destinations': 'መዳረሻዎች',
            'nav-gallery': 'ፎቶ ጋለሪ',
            'nav-about': 'ስለ እኛ',
            'nav-contact': 'አግኙን',
            'hero-title': 'የ<span>ኢትዮጵያ</span> ድንቆችን ያግኙ',
            'hero-subtitle': 'በሰው ልጅ መገኛ አገር ሙያዊ የአእዋፍ እና የባህል ጉዞዎች',
            'hero-cta1': 'ጉዞዎችን ይመልከቱ',
            'hero-cta2': 'ያግኙን',
            'stat-tours': 'ጉዞዎች',
            'stat-birds': 'የአእዋፍ ዝርያዎች',
            'stat-tribes': 'ብሄሮች',
            'stat-years': 'የልምድ ዓመታት',
            'featured-title': 'ታዋቂ <span>ጉዞዎች</span>',
            'featured-subtitle': 'በኢትዮጵያ ውስጥ በጣም አስደናቂ በሆኑ መዳረሻዎች የተዘጋጁ ጀብዱዎች',
            'destinations-title': 'ታዋቂ <span>መዳረሻዎች</span>',
            'about-title': 'ስለ <span>ትራቨርስ ኢትዮጵያ</span>',
            'contact-title': 'ያግኙ<span>ን</span>',
            'contact-subtitle': 'የኢትዮጵያ ጀብዱዎን አብረን እንይ',
            'footer-about': 'ትራቨርስ ኢትዮጵያ በሙያዊ የአካባቢ አስጎብኚዎች የሚመራ እውነተኛ የአእዋፍ እና የባህል ጉዞዎች ያቀርባል።',
            'footer-tours': 'ጉዞዎቻችን',
            'footer-destinations': 'መዳረሻዎች',
            'footer-contact': 'አግኙን',
            'footer-rights': 'መብቶች በሙሉ የተጠበቁ ናቸው',
            'form-name': 'ሙሉ ስም',
            'form-email': 'ኢሜል አድራሻ',
            'form-phone': 'ስልክ ቁጥር',
            'form-tour': 'ፍላጎት ያለዎት ጉዞ',
            'form-dates': 'የጉዞ ቀናት',
            'form-people': 'የተጓዦች ቁጥር',
            'form-budget': 'የበጀት መጠን',
            'form-message': 'ልዩ ጥያቄዎች',
            'form-submit': 'የቦኪንግ ጥያቄ ይላኩ'
        }
    };
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            if (lang === currentLang) return;
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentLang = lang;
            
            // Update all translatable elements
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.dataset.translate;
                if (translations[lang] && translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
            
            // RTL for Amharic
            if (lang === 'am') {
                document.body.style.direction = 'rtl';
                document.body.style.textAlign = 'right';
            } else {
                document.body.style.direction = 'ltr';
                document.body.style.textAlign = 'left';
            }
        });
    });
    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Contact Form Handling =====
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const message = this.querySelector('textarea');
            
            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Build WhatsApp message
            const phone = '+251924012897';
            const text = `Booking Request from Traverse Ethiopia\n\nName: ${name.value}\nEmail: ${email.value}\nPhone: ${this.querySelector('input[type="tel"]')?.value || 'Not provided'}\nTour Interest: ${this.querySelector('select')?.value || 'Not specified'}\n\nMessage: ${message.value}`;
            
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
            
            // Also send email fallback
            const emailBody = encodeURIComponent(text);
            window.open(`mailto:traverseethiopia@gmail.com?subject=Booking%20Request&body=${emailBody}`, '_blank');
            
            // Show success message
            alert('Thank you! Your booking request has been sent. We will get back to you within 24 hours.');
            this.reset();
        });
    }
    
    // ===== Gallery Lightbox =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            cursor: pointer;
            align-items: center;
            justify-content: center;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        `;
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Open lightbox on click
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.style.display = 'flex';
                }
            });
        });
        
        // Close lightbox
        lightbox.addEventListener('click', function() {
            this.style.display = 'none';
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // ===== Animate Stats Counter =====
    const stats = document.querySelectorAll('.hero-stats .number');
    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count || entry.target.textContent);
                    animateNumber(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
    
    function animateNumber(el, target) {
        let current = 0;
        const increment = Math.ceil(target / 50);
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + '+';
                clearInterval(timer);
            } else {
                el.textContent = current + '+';
            }
        }, stepTime);
    }
});
