import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const uiBundle = await readFile(resolve(root, 'vendor/react-ui.js'), 'utf8');

function createPage() {
  return new JSDOM(html, {
    url: 'https://example.test/Com1pbx/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
}

function tableData(document) {
  const rows = [...document.querySelectorAll('#react-specifications table tr')];
  return rows.map((row) =>
    [...row.children].map((cell) => cell.textContent.replace(/\s+/g, ' ').trim()),
  );
}

async function waitFor(predicate, message) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (predicate()) return;
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 10));
  }
  assert.fail(message);
}

test('the specifications remain readable without JavaScript', () => {
  const page = createPage();
  const document = page.window.document;

  assert.equal(document.querySelectorAll('#react-specifications table').length, 1);
  assert.ok(document.querySelector('#react-specifications caption'));
  assert.ok(document.querySelector('#spec-storage'));
  assert.ok(tableData(document).length > 5);
  assert.equal(document.querySelector('.copy-specifications'), null);
  page.window.close();
});

test('React Bootstrap preserves the specifications and copies their contents', async () => {
  const page = createPage();
  const { document, navigator, MouseEvent } = page.window;
  const fallbackData = tableData(document);
  const fallbackIds = [...document.querySelectorAll('#react-specifications tr[id]')].map(
    (row) => row.id,
  );
  const copied = [];
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async (text) => copied.push(text) },
  });

  page.window.eval(uiBundle);
  await waitFor(
    () => document.querySelector('[data-react-ui="specifications"]'),
    'React specifications did not render',
  );

  assert.deepEqual(tableData(document), fallbackData);
  assert.deepEqual(
    [...document.querySelectorAll('#react-specifications tr[id]')].map((row) => row.id),
    fallbackIds,
  );
  const button = document.querySelector('.copy-specifications');
  assert.ok(button.classList.contains('btn'));
  button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await waitFor(
    () => document.querySelector('[role="status"]').textContent === 'Specifications copied.',
    'Copy feedback was not shown',
  );
  assert.equal(copied[0], fallbackData.map((row) => row.join('\t')).join('\n'));
  page.window.close();
});

test('the copy action provides a fallback when clipboard access fails', async () => {
  for (const clipboard of [
    undefined,
    { writeText: async () => Promise.reject(new Error('Denied')) },
  ]) {
    const page = createPage();
    Object.defineProperty(page.window.navigator, 'clipboard', {
      configurable: true,
      value: clipboard,
    });
    page.window.eval(uiBundle);
    await waitFor(
      () => page.window.document.querySelector('.copy-specifications'),
      'Copy button did not render',
    );
    page.window.document
      .querySelector('.copy-specifications')
      .dispatchEvent(new page.window.MouseEvent('click', { bubbles: true }));
    await waitFor(
      () => page.window.document.querySelector('[role="status"]').textContent.includes('select'),
      'Clipboard fallback was not shown',
    );
    page.window.close();
  }
});

test('Animate.css is local and the site respects reduced motion', async () => {
  const css = await readFile(resolve(root, 'src/style.css'), 'utf8');
  const animations = await readFile(resolve(root, 'vendor/animate.min.css'), 'utf8');
  assert.match(html, /href="\.\/vendor\/animate\.min\.css"/);
  assert.match(html, /animate__animated animate__fadeInUp/);
  assert.match(animations, /\.animate__fadeInUp\{/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /animation-duration: 0\.01ms !important/);
});

test('the favicon set contains the expected browser and Apple icon sizes', async () => {
  for (const [path, size] of [
    ['icons/favicon-16x16.png', 16],
    ['icons/favicon-32x32.png', 32],
    ['icons/favicon-48x48.png', 48],
    ['icons/apple-touch-icon.png', 180],
  ]) {
    const metadata = await sharp(resolve(root, path)).metadata();
    assert.equal(metadata.width, size);
    assert.equal(metadata.height, size);
    if (size === 180) assert.equal(metadata.hasAlpha, false);
  }

  const ico = await readFile(resolve(root, 'favicon.ico'));
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);
  assert.deepEqual([ico[6], ico[22], ico[38]], [16, 32, 48]);
  assert.match(html, /href="\.\/favicon\.ico"/);
  assert.match(html, /href="\.\/favicon\.svg"/);
  assert.match(html, /rel="apple-touch-icon" href="\.\/icons\/apple-touch-icon\.png"/);
});
