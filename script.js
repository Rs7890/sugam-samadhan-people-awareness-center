/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { loader.style.display = 'none'; }, 500);
  }, 1200);

  /* Show cookie banner */
  if (!localStorage.getItem('cookieAccepted')) {
    setTimeout(() => {
      document.getElementById('cookieBanner').classList.add('show');
    }, 2000);
  }
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    scrollTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    scrollTop.classList.remove('show');
  }

  /* Active nav link on scroll */
  const sections = ['home','about','services','gaon','programs','ngo','contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ── SCROLL TO TOP ── */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── SERVICE TABS ── */
function showTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = target >= 1000
      ? Math.floor(current).toLocaleString('en-IN') + '+'
      : Math.floor(current);
  }, 16);
}

/* ── INTERSECTION OBSERVER ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      /* Trigger counters */
      entry.target.querySelectorAll('[data-target]').forEach(el => {
        if (!el.dataset.counted) {
          el.dataset.counted = true;
          animateCounter(el);
        }
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up, .hero-stats, .impact-grid').forEach(el => observer.observe(el));

/* Also observe stat elements directly for hero */
document.querySelectorAll('.hero-stat .val[data-target]').forEach(el => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !el.dataset.counted) {
        el.dataset.counted = true;
        animateCounter(el);
      }
    });
  }, { threshold: 0.5 });
  io.observe(el);
});

/* ── CONTACT FORM ── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = '⏳ Bhej rahe hain...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formSuccess').classList.add('show');
    btn.textContent = '✅ Bhej Diya!';
    document.getElementById('contactForm').reset();
    setTimeout(() => {
      btn.textContent = '📩 Sandesh Bhejein';
      btn.disabled = false;
      document.getElementById('formSuccess').classList.remove('show');
    }, 4000);
  }, 1500);
}

/* ── COOKIE ── */
function acceptCookie() {
  localStorage.setItem('cookieAccepted', '1');
  document.getElementById('cookieBanner').classList.remove('show');
}
function dismissCookie() {
  document.getElementById('cookieBanner').classList.remove('show');
}

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - 68;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
