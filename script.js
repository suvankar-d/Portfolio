// ---------------------------------------------------
// Footer year
// ---------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------------------
// Nav highlighting: mark the link matching the current page
// ---------------------------------------------------
const currentPage = document.body.getAttribute('data-page');
document.querySelectorAll('.nav-link').forEach((link) => {
  link.classList.toggle('active', link.getAttribute('data-page') === currentPage);
});

// ---------------------------------------------------
// Reveal-on-scroll for section entrances
// ---------------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------------------------------------------------
// Project "read more" toggles
// ---------------------------------------------------
document.querySelectorAll('.project-toggle').forEach((btn) => {
  const panel = btn.parentElement.querySelector('.project-more');

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));

    if (expanded) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    btn.querySelector('.toggle-text').textContent = expanded ? 'Read the methodology' : 'Hide the methodology';
  });
});

// ---------------------------------------------------
// Contact form — mailto handoff with inline confirmation
// ---------------------------------------------------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formNote.textContent = 'Please fill in every field before sending.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:amitdas05876@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = 'Opening your email client to send this message…';
  contactForm.reset();
});
