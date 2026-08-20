const dialog = document.querySelector('#contact-dialog');
const form = document.querySelector('[data-contact-form]');
const marker = document.querySelector('#wind-marker');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let lastTrigger = null;

function openContactDialog(trigger) {
  lastTrigger = trigger;
  dialog.hidden = false;
  document.body.style.overflow = 'hidden';
  dialog.querySelector('input, textarea, button')?.focus();
}

function closeContactDialog() {
  dialog.hidden = true;
  document.body.style.overflow = '';
  lastTrigger?.focus();
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

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) closeContactDialog();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !dialog.hidden) closeContactDialog();
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.replaceWith(Object.assign(document.createElement('p'), {
    className: 'form-success',
    textContent: 'Thanks — we’ll be in touch soon.',
  }));
});

setupWindMarker();
