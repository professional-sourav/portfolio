(function () {
  'use strict';

  /* ---- NAVBAR: smart hide/show + glassmorphism ---- */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0, ticking = false;

  function updateNav() {
    const cur = window.scrollY;
    navbar.classList.toggle('scrolled', cur > 80);
    navbar.classList.toggle('hidden', cur > lastScroll && cur > 200);
    lastScroll = cur <= 0 ? 0 : cur;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
  }, { passive: true });

  /* ---- HAMBURGER / DRAWER ---- */
  const hamburger = document.getElementById('hamburger-btn');
  const drawer    = document.getElementById('mobile-drawer');
  const overlay   = document.getElementById('drawer-overlay');

  function openDrawer() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.closeDrawer = closeDrawer;

  hamburger.addEventListener('click', () =>
    drawer.classList.contains('open') ? closeDrawer() : openDrawer()
  );
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* ---- TYPEWRITER ---- */
  const phrases = ['Laravel Specialist', 'Filament Expert', 'React Developer', 'n8n Automation Expert', 'WordPress Expert', 'API Architect'];
  const twEl = document.getElementById('typewriter-text');
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    twEl.textContent = deleting ? phrase.slice(0, ci - 1) : phrase.slice(0, ci + 1);
    deleting ? ci-- : ci++;

    if (!deleting && ci === phrase.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
    if (deleting && ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
    setTimeout(type, deleting ? 55 : 90);
  }

  setTimeout(type, 900);

  /* ---- SCROLL REVEAL ---- */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ---- SCROLL SPY ---- */
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');

  const spyObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === e.target.id));
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('section[id]').forEach(s => spyObs.observe(s));

  /* ---- PORTFOLIO FILTER ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#portfolio-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && !(card.dataset.tags || '').includes(f));
      });
    });
  });

  /* ---- CONTACT FORM ---- */
  const form      = document.getElementById('contact-form');
  const success   = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const submitBtn = document.getElementById('submit-btn');
  const btnLabel  = submitBtn.querySelector('.btn-label');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    if (!name || !email || !message) return;

    submitBtn.disabled = true;
    btnLabel.textContent = 'Sending…';
    success.style.display = 'none';
    formError.style.display = 'none';

    try {
      const _k = atob('YTI3ZjkxOTUtM2M3My00NWI2LWE3MjYtZGUwNDk4OWM3Mjg5');
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: _k,
          subject: 'Portfolio enquiry from ' + name,
          from_name: name,
          name,
          email,
          message
        })
      });
      const data = await res.json();
      if (data.success) {
        success.style.display = 'block';
        form.reset();
        setTimeout(() => { success.style.display = 'none'; }, 7000);
      } else {
        formError.style.display = 'block';
      }
    } catch {
      formError.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      btnLabel.textContent = 'Send Message';
    }
  });

  /* ---- BACK TO TOP ---- */
  const btt = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

  /* ---- DARK / LIGHT THEME TOGGLE ---- */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;

  const THEME_KEY = 'portfolio-theme-v2';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeToggleBtn.setAttribute('aria-label',
      theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
    );
  }

  function themeByTime() {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  }

  const manualTheme = localStorage.getItem(THEME_KEY);
  applyTheme(manualTheme || themeByTime());

  themeToggleBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

})();

/* ---- SECURE RESUME DOWNLOAD ---- */
async function downloadResume(btn) {
  const label = btn.querySelector('.btn-label');
  const original = label.textContent;
  btn.disabled = true;
  label.textContent = 'Preparing…';

  try {
    const res = await fetch('my-resume.pdf', { cache: 'no-store' });
    if (!res.ok) throw new Error('not found');
    const blob = await res.blob();
    if (blob.type && !blob.type.includes('pdf')) throw new Error('invalid type');

    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = 'Sourav_Chakraborty_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch {
    alert('Resume download is temporarily unavailable. Please try again later.');
  } finally {
    btn.disabled = false;
    label.textContent = original;
  }
}
