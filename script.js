/* ============================================================
   DZ Carp — script.js
   Vanilla JavaScript — navigation, animations, form, gallery
   ============================================================ */

'use strict';

/* ── Wait for DOM to be fully loaded ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. NAVBAR — scroll behaviour & hamburger toggle
     ============================================================ */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('nav-links');
  const allNavLinks = document.querySelectorAll('.nav-link');

  /**
   * Add .scrolled class to navbar once the user scrolls past the hero.
   * This darkens and adds shadow to the nav bar.
   */
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load

  /**
   * Toggle the mobile hamburger menu open / closed.
   */
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  /**
   * Close the mobile menu when any nav link is clicked.
   */
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /**
   * Close mobile menu when clicking outside of it.
   */
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });


  /* ============================================================
     2. ACTIVE NAV LINK — highlight current section in viewport
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');

  /**
   * Determine which section is currently in view and mark its
   * corresponding nav link as active.
   */
  function setActiveNavLink() {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // offset for fixed nav
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();


  /* ============================================================
     3. SCROLL-TRIGGERED ANIMATIONS
        Uses IntersectionObserver to add .animated to elements
        marked with data-animate as they enter the viewport.
     ============================================================ */
  const animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            // Stagger the animation delay for sibling elements
            const siblings = [...entry.target.parentElement.children];
            const delay    = siblings.indexOf(entry.target) * 80;
            setTimeout(() => {
              entry.target.classList.add('animated');
            }, delay);
            observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers — show everything immediately
    animatedElements.forEach(el => el.classList.add('animated'));
  }


  /* ============================================================
     4. BACK TO TOP BUTTON
     ============================================================ */
  const backToTopBtn = document.getElementById('back-to-top');

  /**
   * Show the back-to-top button after scrolling 400px.
   */
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ============================================================
     5. GALLERY LIGHTBOX
        Clicking a gallery item that has a loaded image opens
        it in a full-screen lightbox overlay.
     ============================================================ */
  const galleryItems   = document.querySelectorAll('.gallery-item');
  const lightbox       = document.getElementById('lightbox');
  const lightboxImg    = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose  = document.getElementById('lightbox-close');

  /**
   * Open the lightbox with the given image src and caption.
   */
  function openLightbox(src, caption) {
    lightboxImg.src     = src;
    lightboxImg.alt     = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  /**
   * Close the lightbox.
   */
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // Attach click handler to each gallery item
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Only open lightbox if the image loaded successfully (not a placeholder)
      const img = item.querySelector('img');
      if (img && !item.classList.contains('gallery-placeholder')) {
        openLightbox(img.src, item.dataset.caption || '');
      }
    });
  });

  // Close when clicking the ✕ button
  lightboxClose.addEventListener('click', closeLightbox);

  // Close when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });


  /* ============================================================
     6. CONTACT FORM VALIDATION & SUBMISSION
     ============================================================ */
  const contactForm  = document.getElementById('contact-form');
  const submitBtn    = document.getElementById('submit-btn');
  const formSuccess  = document.getElementById('form-success');

  const fields = {
    name:    { el: document.getElementById('name'),    errorEl: document.getElementById('name-error') },
    email:   { el: document.getElementById('email'),   errorEl: document.getElementById('email-error') },
    message: { el: document.getElementById('message'), errorEl: document.getElementById('message-error') },
  };

  /**
   * Validate a single field. Returns true if valid.
   */
  function validateField(key) {
    const { el, errorEl } = fields[key];
    let error = '';

    switch (key) {
      case 'name':
        if (!el.value.trim()) error = 'Please enter your name.';
        break;
      case 'email':
        if (!el.value.trim()) {
          error = 'Please enter your email address.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'message':
        if (!el.value.trim()) {
          error = 'Please enter a message.';
        } else if (el.value.trim().length < 10) {
          error = 'Message must be at least 10 characters.';
        }
        break;
    }

    errorEl.textContent = error;
    el.classList.toggle('error', Boolean(error));
    return !error;
  }

  // Validate each field on blur (as user leaves the input)
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    // Clear error as the user starts typing again
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) {
        validateField(key);
      }
    });
  });

  /**
   * Handle form submission.
   * Validates all required fields and simulates a successful send.
   */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    const isValid = Object.keys(fields).map(k => validateField(k)).every(Boolean);

    if (!isValid) return;

    // Simulate async form submission (replace with real fetch/API call)
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
      formSuccess.style.display = 'block';
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1200);
  });


  /* ============================================================
     7. SMOOTH SCROLL for anchor links with fixed nav offset
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId  = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  /* ============================================================
     8. HERO STATS — animated number counter on first scroll
     ============================================================ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  /**
   * Animate counting up from 0 to the target number.
   */
  function animateCounter(el, target, duration = 1800) {
    const start     = performance.now();
    const numTarget = parseInt(target.replace(/\D/g, ''), 10);
    const suffix    = target.replace(/[0-9]/g, '');

    function step(timestamp) {
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * numTarget) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /**
   * Trigger counter animation once when hero stats scroll into view.
   */
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach(el => {
            animateCounter(el, el.textContent);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) statsObserver.observe(heroStats);
  }

}); // end DOMContentLoaded
