/* ==========================================================================
   LUME ADVISORY – FORM INTERACTIONS
   Contact inquiry handling, validation & soft editorial toast feedback
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('lume-contact-form');
    const toast = document.getElementById('contact-toast');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Transmitting Dossier...</span>`;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }

          if (toast) {
            toast.style.display = 'block';
            toast.innerHTML = `
              <strong>Inquiry Received with Distinction.</strong><br>
              A Senior Advisory Partner will review your briefing and respond within 24 business hours.
            `;
          }

          contactForm.reset();

          if (toast) {
            toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 1000);
      });
    }

    // Careers application modal / form if present
    const careerForm = document.getElementById('career-application-form');
    const careerToast = document.getElementById('career-toast');

    if (careerForm) {
      careerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = careerForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Submitting Portfolio...</span>`;
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Application Submitted</span>`;
          }

          if (careerToast) {
            careerToast.style.display = 'block';
            careerToast.innerHTML = `
              <strong>Portfolio Received.</strong><br>
              Our Talent Partner reviews submissions weekly. We will be in touch if your background aligns with active studio engagements.
            `;
          }

          careerForm.reset();
        }, 900);
      });
    }
  });
})();
