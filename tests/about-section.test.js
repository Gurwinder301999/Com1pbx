import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const html = await readFile(resolve(root, 'index.html'), 'utf8');

function text(element) {
  return element.textContent.replace(/\s+/g, ' ').trim();
}

test('the About section presents the appliance and its authorised dealer', () => {
  const page = new JSDOM(html);
  const document = page.window.document;
  const section = document.querySelector('#appliance');
  assert.ok(section);
  assert.equal(section.getAttribute('aria-labelledby'), 'appliance-label appliance-title');
  const accessibleName = section
    .getAttribute('aria-labelledby')
    .split(' ')
    .map((id) => text(document.getElementById(id)))
    .join(' ');
  assert.equal(accessibleName, 'ABOUT THE APPLIANCE A PRACTICAL FOUNDATION.');
  assert.match(text(section), /2U rack-mount platform.*basic PBX.*call center operations/);
  assert.match(text(section), /standard, globally available components.*local maintenance/);
  assert.match(text(section), /database backup and restore/);
  assert.match(
    text(section),
    /Higher-capacity storage and additional LAN cards.*when ordering.*additional cost/,
  );
  assert.match(text(section), /authorised dealer Cromptech Integrated Solutions Pvt\. Ltd\./);
  assert.match(text(section), /UP TO 2,000.*Extensions for basic PBX/);
  assert.match(text(section), /UP TO 25 AGENTS.*call center operations/);
  const highlights = section.querySelector('[role="group"][aria-label="Appliance highlights"]');
  assert.equal(highlights.querySelectorAll('.benefit').length, 3);
  assert.ok(section.querySelector('.technology-image img[alt][srcset][sizes]'));
  assert.ok(section.querySelector('a[href="#specifications"]'));
  assert.ok(section.querySelector('a[href="#contact"]'));
  assert.equal(
    document.querySelector('.main-nav a[href="#appliance"]').textContent.trim(),
    'About',
  );
  assert.equal(
    document.querySelector('.footer-nav a[href="#appliance"]').textContent.trim(),
    'About',
  );
  page.window.close();
});
