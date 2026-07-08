// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form submission (Formspree)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;

    status.textContent = '';
    status.className = 'form-status';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thanks — we've received your enquiry and will get back to you shortly.";
        status.className = 'form-status success';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please email us directly at sales@giss.co.in.';
        status.className = 'form-status error';
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please email us directly at sales@giss.co.in.';
      status.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}
