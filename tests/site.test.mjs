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
