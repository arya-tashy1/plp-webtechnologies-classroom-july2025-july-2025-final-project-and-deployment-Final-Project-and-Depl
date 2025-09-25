// ========== Responsive Mobile Menu ==========
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
}

// ========== Active Navigation Highlight ==========
const currentPage = location.pathname.split('/').pop() || "index.html";
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// ========== Dark/Light Mode Toggle ==========
(function() {
  // Add a toggle button to the header if not present
  let modeBtn = document.getElementById('mode-toggle');
  if (!modeBtn) {
    modeBtn = document.createElement('button');
    modeBtn.id = 'mode-toggle';
    modeBtn.className = 'btn mode-toggle-btn';
    modeBtn.setAttribute('aria-label', 'Toggle dark/light mode');
    modeBtn.style.marginLeft = "1.5rem";
    modeBtn.innerHTML = '🌙';
    document.querySelector('header').appendChild(modeBtn);
  }

  function setMode(dark) {
    if (dark) {
      document.body.classList.add('darkmode');
      modeBtn.innerHTML = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('darkmode');
      modeBtn.innerHTML = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
  // initial
  const dark = localStorage.getItem('theme') === 'dark';
  setMode(dark);

  modeBtn.addEventListener('click', () => {
    setMode(!document.body.classList.contains('darkmode'));
  });
})();

// ========== Contact Form Validation ==========
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    let valid = true;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    const error = form.querySelector('.error');
    error.style.display = 'none';

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      valid = false;
      error.textContent = 'All fields are required.';
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) {
      valid = false;
      error.textContent = 'Please enter a valid email address.';
    }

    if (!valid) {
      error.style.display = 'block';
      error.setAttribute('aria-live', 'polite');
      e.preventDefault();
    }
  });
}

// ========== Gallery Filtering ==========
const filterBtns = document.querySelectorAll('.gallery-filter button');
const galleryImgs = document.querySelectorAll('.gallery-grid img[data-category]');
if (filterBtns.length && galleryImgs.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const cat = this.getAttribute('data-category');
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      galleryImgs.forEach(img => {
        img.parentElement.style.display =
          (cat === 'all' || img.getAttribute('data-category') === cat) ? '' : 'none';
      });
    });
  });
}

// ========== Gallery Lightbox ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const lightboxClose = document.querySelector('.lightbox .close');

if (galleryImgs.length && lightbox && lightboxImg && lightboxClose) {
  galleryImgs.forEach(img => {
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.style.display = 'flex';
      lightboxImg.focus();
    });
    img.addEventListener('keydown', function(e) {
      if (e.key === "Enter" || e.key === " ") {
        this.click();
      }
    });
  });

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" && lightbox.style.display === 'flex') closeLightbox();
  });
}

// ========== Animated Counters ==========
function animateCounter(el, target, duration) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  function update() {
    start += step;
    if (start >= target) {
      el.textContent = target;
    } else {
      el.textContent = start;
      requestAnimationFrame(update);
    }
  }
  update();
}
window.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter[data-target]');
  counters.forEach(counter => {
    animateCounter(counter, Number(counter.getAttribute('data-target')), 1200);
  });
});

// ========== Carousel/Slider for Testimonials ==========
(function(){
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.testimonial-slide');
  const nextBtn = slider.querySelector('.next');
  const prevBtn = slider.querySelector('.prev');
  let idx = 0;

  function showSlide(i) {
    slides.forEach((slide, n) => {
      slide.style.display = (n === i) ? 'block' : 'none';
    });
  }
  showSlide(idx);

  nextBtn && nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    showSlide(idx);
  });
  prevBtn && prevBtn.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    showSlide(idx);
  });
})();

// ========== Scroll-triggered Animations ==========
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const winBottom = window.innerHeight + window.scrollY;
  reveals.forEach(el => {
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    if (winBottom > elTop + 60) {
      el.classList.add('revealed');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// ========== Optional: Scroll to Top Button ==========
(function() {
  const btn = document.createElement('button');
  btn.textContent = "↑ Top";
  btn.className = "scroll-top-btn";
  btn.style.display = "none";
  btn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    btn.style.display = (window.scrollY > 350) ? "block" : "none";
  });

  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
