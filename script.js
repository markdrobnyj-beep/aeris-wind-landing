const dialog = document.querySelector('#contact-dialog');
const form = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-contact-status]');
const marker = document.querySelector('#wind-marker');
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mainNavigation = document.querySelector('#main-navigation');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lastTrigger = null;

function openContactDialog(trigger) {
  lastTrigger = trigger;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.querySelector('input')?.focus();
}

function closeContactDialog() {
  dialog.close();
}

function setMenuOpen(isOpen) {
  siteHeader?.classList.toggle('menu-open', isOpen);
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
}

function setupWindMarker() {
  if (!marker || reducedMotion.matches) return;

  document.querySelector('.hero')?.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 9;
    const y = (event.clientY / window.innerHeight - 0.5) * -20;
    marker.style.setProperty('--marker-x', `${x}deg`);
    marker.style.setProperty('--marker-y', `${y}deg`);
  });
}

document.querySelectorAll('[data-open-contact]').forEach((button) => {
  button.addEventListener('click', () => openContactDialog(button));
});

document.querySelectorAll('[data-close-contact]').forEach((button) => {
  button.addEventListener('click', closeContactDialog);
});

menuToggle?.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mainNavigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) closeContactDialog();
});

dialog?.addEventListener('close', () => {
  document.body.style.overflow = '';
  lastTrigger?.focus();
  lastTrigger = null;
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.reset();
  formStatus.hidden = false;
  formStatus.textContent = 'Messages are not transmitted from this portfolio demo.';
});

setupWindMarker();
