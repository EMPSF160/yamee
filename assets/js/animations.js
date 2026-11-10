/* ==========================================================================
   LUME ADVISORY – GSAP & SCROLL ANIMATIONS
   Editorial reveals, image parallax, soft cursor follower & micro-interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Custom Soft Luxury Cursor Logic
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (cursor && follower && !window.matchMedia('(pointer: coarse)').matches) {
    let mousePos = { x: -100, y: -100 };
    let cursorPos = { x: -100, y: -100 };
    let followerPos = { x: -100, y: -100 };

    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    const updateCursor = () => {
      cursorPos.x += (mousePos.x - cursorPos.x) * 0.35;
      cursorPos.y += (mousePos.y - cursorPos.y) * 0.35;
      followerPos.x += (mousePos.x - followerPos.x) * 0.16;
      followerPos.y += (mousePos.y - followerPos.y) * 0.16;

      cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      follower.style.transform = `translate(${followerPos.x}px, ${followerPos.y}px)`;

      requestAnimationFrame(updateCursor);
    };
    requestAnimationFrame(updateCursor);

    // Interactive Hover Elements
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, select, .practice-card, .calc-option-btn, .accordion-header-btn');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // If reduced motion is requested or GSAP is not present, skip complex timeline
  if (prefersReducedMotion || typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 2. Hero Editorial Text Reveal (Smooth, elegant cascade)
  const heroPanel = document.querySelector('.hero-panel-text');
  if (heroPanel) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const badge = heroPanel.querySelector('.editorial-badge');
    const title = heroPanel.querySelector('.hero-title');
    const lead = heroPanel.querySelector('.hero-lead');
    const actions = heroPanel.querySelector('.hero-actions');
    const footer = heroPanel.querySelector('.hero-meta-footer');
    const visual = document.querySelector('.hero-panel-visual');

    if (badge) heroTl.fromTo(badge, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1 });
    if (title) heroTl.fromTo(title, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.4');
    if (lead) heroTl.fromTo(lead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
    if (actions) heroTl.fromTo(actions, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
    if (footer) heroTl.fromTo(footer, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.4');
    if (visual) heroTl.fromTo(visual, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out' }, 0.2);
  }

  // 3. Inner Page Hero Reveals
  const innerHero = document.querySelector('.inner-hero-panel');
  if (innerHero) {
    gsap.fromTo(
      innerHero.children,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out', delay: 0.15 }
    );
  }

  // 4. Subtle Image Parallax on ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    const parallaxImages = document.querySelectorAll('.case-study-img-wrap img, .hero-panel-visual img');
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });

    // 5. Stat Counter Animations
    const statCounters = document.querySelectorAll('.manifesto-stat-item h3, .metric-item strong');
    statCounters.forEach((counter) => {
      const originalText = counter.innerText;
      const numericVal = parseFloat(originalText.replace(/[^0-9.]/g, ''));
      if (isNaN(numericVal)) return;

      const prefix = originalText.startsWith('$') ? '$' : '';
      const suffix = originalText.endsWith('%') ? '%' : (originalText.endsWith('+') ? '+' : (originalText.endsWith('B') ? 'B' : (originalText.endsWith('M') ? 'M' : '')));

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            { val: 0 },
            { val: numericVal },
            {
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: function () {
                const current = Math.floor(this.targets()[0].val);
                counter.innerText = `${prefix}${current}${suffix}`;
              },
              onComplete: function () {
                counter.innerText = originalText;
              }
            }
          );
        }
      });
    });

    // 6. Fade-up animation for rounded panels
    const fadeCards = document.querySelectorAll('.practice-card, .framework-phase-card, .lume-panel');
    fadeCards.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true
          }
        }
      );
    });
  }
});
