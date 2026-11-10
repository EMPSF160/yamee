/* ==========================================================================
   LUME ADVISORY – MAIN JAVASCRIPT
   Header effects, mobile drawer, interactive widgets, world clocks & scroll spy
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 2. Sticky Header Effect & Back to Top
    const header = document.querySelector('.lume-header');
    const backToTop = document.querySelector('.back-to-top-btn');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      if (header) {
        if (scrollPos > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      if (backToTop) {
        if (scrollPos > 400) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 3. Mobile Hamburger & Navigation Drawer
    const hamburger = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');

    function openMobileMenu() {
      if (!hamburger || !mobileDrawer) return;
      hamburger.classList.add('active');
      mobileDrawer.classList.add('open');
      if (mobileBackdrop) mobileBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      if (!hamburger || !mobileDrawer) return;
      hamburger.classList.remove('active');
      mobileDrawer.classList.remove('open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // 4. Active Page Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-links a');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 5. Testimonial Swiper (Home Page)
    const testimonialSwiperEl = document.querySelector('.testimonial-swiper');
    if (testimonialSwiperEl && typeof Swiper !== 'undefined') {
      new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 700,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });
    }

    // 6. Editorial FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header-btn');
    accordionHeaders.forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item-editorial');
        if (!item) return;

        const wasOpen = item.classList.contains('open');

        const siblingItems = item.parentElement.querySelectorAll('.accordion-item-editorial');
        siblingItems.forEach((sibling) => sibling.classList.remove('open'));

        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    });

    // 7. Interactive Service Engagement Calculator (Services page)
    const calcOptions = document.querySelectorAll('.calc-option-btn');
    const resultTitle = document.getElementById('calc-model-name');
    const resultDesc = document.getElementById('calc-model-desc');
    const resultTimeline = document.getElementById('calc-model-timeline');

    if (calcOptions.length > 0 && resultTitle) {
      const models = {
        'positioning': {
          title: 'Strategic Market Positioning Sprint',
          desc: 'High-intensity diagnostic and narrative re-architecture to define unassailable competitive advantage.',
          timeline: '6–8 Weeks Duration • Senior Partner Led'
        },
        'architecture': {
          title: 'Comprehensive Brand & Digital Architecture',
          desc: 'Full-spectrum creative direction, design system engineering, and executive storytelling overhaul.',
          timeline: '12–16 Weeks Duration • Dedicated Creative Cell'
        },
        'transformation': {
          title: 'Institutional Agility & Enterprise Advisory',
          desc: 'Cross-functional operating model design, governance alignment, and executive change management.',
          timeline: '6–9 Months Engagement • Embedded Advisory Council'
        },
        'venture': {
          title: 'Venture Incubation & Co-Design Cell',
          desc: 'Zero-to-one product design, brand commercialization, and rapid market deployment for strategic initiatives.',
          timeline: 'Ongoing Retainer • Shared Value Structure'
        }
      };

      calcOptions.forEach((btn) => {
        btn.addEventListener('click', () => {
          calcOptions.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const key = btn.getAttribute('data-model') || 'positioning';
          const data = models[key];
          if (data) {
            resultTitle.textContent = data.title;
            resultDesc.textContent = data.desc;
            if (resultTimeline) resultTimeline.textContent = data.timeline;
          }
        });
      });
    }

    // 8. Career Filters (Careers page)
    const careerFilterBtns = document.querySelectorAll('.career-filter-btn');
    const careerCards = document.querySelectorAll('.career-job-card');

    if (careerFilterBtns.length > 0 && careerCards.length > 0) {
      careerFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          careerFilterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const filterVal = btn.getAttribute('data-filter');

          careerCards.forEach((card) => {
            const category = card.getAttribute('data-category');
            if (filterVal === 'all' || category === filterVal) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // 9. Sticky Services Sidebar ScrollSpy (Services page)
    const servicesSidebarLinks = document.querySelectorAll('.services-nav-index-list a');
    const serviceSections = document.querySelectorAll('.service-deepdive-module, #matrix, #calculator');

    if (servicesSidebarLinks.length > 0 && serviceSections.length > 0) {
      window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollOffset = window.scrollY + 180;

        serviceSections.forEach((section) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollOffset >= top && scrollOffset < top + height) {
            currentSectionId = section.getAttribute('id');
          }
        });

        if (currentSectionId) {
          servicesSidebarLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${currentSectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }, { passive: true });
    }

    // 10. Live Global Studio Clocks (Contact page)
    const studioClocks = [
      { id: 'clock-zurich', timeZone: 'Europe/Zurich', label: 'CET' },
      { id: 'clock-ny', timeZone: 'America/New_York', label: 'EST' },
      { id: 'clock-london', timeZone: 'Europe/London', label: 'GMT' },
      { id: 'clock-tokyo', timeZone: 'Asia/Tokyo', label: 'JST' }
    ];

    function updateStudioClocks() {
      const now = new Date();
      studioClocks.forEach((cfg) => {
        const el = document.getElementById(cfg.id);
        if (el) {
          try {
            const timeStr = now.toLocaleTimeString('en-GB', {
              timeZone: cfg.timeZone,
              hour: '2-digit',
              minute: '2-digit'
            });
            el.textContent = `${cfg.label} ${timeStr}`;
          } catch (e) {
            // fallback
          }
        }
      });
    }

    updateStudioClocks();
    setInterval(updateStudioClocks, 30000);
  });
})();
