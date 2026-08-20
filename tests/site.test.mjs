import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('page exposes required landmarks and hooks', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const fragment of [
    '<header',
    '<main',
    'id="projects"',
    'id="technology"',
    'id="impact"',
    'id="contact"',
    'id="wind-marker"',
    'data-open-contact',
    'data-contact-form',
  ]) {
    assert.ok(html.includes(fragment), `Missing ${fragment}`);
  }
});

test('styles include responsive and reduced-motion support', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /--cloud:/);
});

test('script wires the agreed interaction hooks', async () => {
  const js = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  for (const hook of [
    'data-open-contact',
    'data-close-contact',
    'data-contact-form',
    'wind-marker',
    'prefers-reduced-motion',
  ]) {
    assert.ok(js.includes(hook), `Missing ${hook}`);
  }
});

test('hero includes a project-statistics layer', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const fragment of ['data-hero-stats', '32', 'Turbines', '210', 'MW', '480k', 'Homes powered']) {
    assert.ok(html.includes(fragment), `Missing ${fragment}`);
  }
});

test('hero styles include the snow-blue atmosphere treatment', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /#EAF6FF/i);
  assert.match(css, /hero-atmosphere/);
  assert.match(css, /@keyframes atmosphere-shift/);
  assert.match(css, /inset: -6%/);
  assert.match(css, /opacity: \.42/);
});

test('page communicates fleet scale and planned capacity', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const fragment of ['id="momentum"', '5,284', 'Turbines built', '18', 'Countries connected', '1.6 GW', 'Planned capacity']) {
    assert.ok(html.includes(fragment), `Missing ${fragment}`);
  }
});

test('mobile navigation remains operable without the desktop links', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const js = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  assert.match(html, /data-menu-toggle/);
  assert.match(html, /aria-controls="main-navigation"/);
  assert.match(js, /data-menu-toggle/);
});

test('contact dialog uses native modal semantics and announces the demo status', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const js = await readFile(new URL('../script.js', import.meta.url), 'utf8');
  assert.match(html, /<dialog[^>]*id="contact-dialog"/);
  assert.match(html, /data-contact-status[^>]*aria-live="polite"/);
  assert.match(js, /showModal\(\)/);
  assert.match(js, /Messages are not transmitted from this portfolio demo/);
});
