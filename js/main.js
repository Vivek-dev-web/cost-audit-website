/* =====================================================
   Sharmaji & Associates – Main JavaScript
   ===================================================== */

'use strict';

/* ========================
   HEADER SCROLL BEHAVIOUR
======================== */
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* ========================
   MOBILE MENU
======================== */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Mobile sub-menus toggle
  mobileNav.querySelectorAll('.mobile-submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const sub = this.nextElementSibling;
      if (sub) sub.classList.toggle('open');
      this.querySelector('.chevron')?.classList.toggle('rotate');
    });
  });
})();

/* ========================
   SMOOTH SCROLL
======================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ========================
   COUNTER ANIMATION
======================== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ''), 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = duration / 60;
  let current = 0;
  const increment = target / (duration / step);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('en-IN') + suffix;
  }, step);
}

(function () {
  const counters = document.querySelectorAll('.counter-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ========================
   AOS-LIKE SCROLL ANIMATIONS
======================== */
(function () {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ========================
   ACCORDION
======================== */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function () {
    const body = this.nextElementSibling;
    const isOpen = this.classList.contains('active');

    // Close all
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.classList.remove('active');
      const b = h.nextElementSibling;
      if (b) b.classList.remove('open');
    });

    if (!isOpen) {
      this.classList.add('active');
      if (body) body.classList.add('open');
    }
  });
});

/* ========================
   CONTACT FORM
======================== */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#dc2626';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    // Email format
    const email = form.querySelector('[type="email"]');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.style.borderColor = '#dc2626';
      return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;

    // Simulate send (replace with actual EmailJS / fetch call)
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#22c55e';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
})();

/* ========================
   COOKIE CONSENT
======================== */
(function () {
  const bar = document.querySelector('.cookie-bar');
  if (!bar) return;

  if (!localStorage.getItem('cookie_consent')) {
    setTimeout(() => bar.classList.add('visible'), 1500);
  }

  bar.querySelector('.btn-cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    bar.classList.remove('visible');
  });
  bar.querySelector('.btn-cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'declined');
    bar.classList.remove('visible');
  });
})();

/* ========================
   ACTIVE NAV LINK
======================== */
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .footer-links a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop();
    if (href === current) a.closest('li')?.classList.add('active');
  });
})();

/* ========================
   STICKY TABLE HEADER
======================== */
(function () {
  const tables = document.querySelectorAll('.sticky-header-table');
  tables.forEach(table => {
    const thead = table.querySelector('thead');
    if (thead) thead.style.position = 'sticky';
    if (thead) thead.style.top = '80px';
    if (thead) thead.style.zIndex = '10';
  });
})();

/* ========================
   PRINT PDF TRACKING
======================== */
document.querySelectorAll('a[data-track-download]').forEach(a => {
  a.addEventListener('click', () => {
    const label = a.dataset.trackDownload || a.href;
    if (typeof gtag !== 'undefined') {
      gtag('event', 'file_download', { file_name: label });
    }
  });
});

/* ========================
   BLOG SEARCH
======================== */
(function () {
  const searchInput = document.getElementById('blog-search');
  if (!searchInput) return;
  const cards = document.querySelectorAll('.blog-card[data-title]');
  searchInput.addEventListener('input', function () {
    const q = this.value.toLowerCase();
    cards.forEach(card => {
      const title = (card.dataset.title || '').toLowerCase();
      card.style.display = title.includes(q) || !q ? '' : 'none';
    });
  });
})();
