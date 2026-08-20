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
