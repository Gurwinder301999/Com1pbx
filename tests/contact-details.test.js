import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const html = await readFile(resolve(root, 'index.html'), 'utf8');

function linksFor(document, label) {
  const row = [...document.querySelectorAll('#contact .dealer-details > div')].find(
    (element) => element.querySelector('dt').textContent.trim() === label,
  );
  assert.ok(row, `Missing ${label} details`);
  return [...row.querySelectorAll('a')].map((link) => [
    link.textContent.trim(),
    link.getAttribute('href'),
  ]);
}

test('the contact section shows the authorised dealer and address without JavaScript', () => {
  const page = new JSDOM(html);
  const document = page.window.document;
  assert.match(document.querySelector('#contact').textContent, /AUTHORISED DEALER/);
  assert.equal(
    document.querySelector('#contact .dealer-card h3').textContent.trim(),
    'Cromptech Integrated Solutions Pvt. Ltd.',
  );
  const address = document.querySelector('#contact .dealer-details dd').textContent;
  assert.match(address, /6\/14, W\.E\.A\., Karol Bagh,/);
  assert.match(address, /New Delhi-110005/);
  page.window.close();
});

test('all dealer phone numbers and email addresses use the correct links', () => {
  const page = new JSDOM(html);
  const document = page.window.document;
  assert.deepEqual(linksFor(document, 'OFFICE'), [
    ['011-45571045', 'tel:+911145571045'],
    ['011-41057015', 'tel:+911141057015'],
    ['011-47013256', 'tel:+911147013256'],
  ]);
  assert.deepEqual(linksFor(document, 'MOBILE'), [
    ['+91-9911109040', 'tel:+919911109040'],
    ['+91-7982988622', 'tel:+917982988622'],
  ]);
  assert.deepEqual(linksFor(document, 'EMAIL'), [
    ['sandeep@cromptechindia.com', 'mailto:sandeep@cromptechindia.com'],
  ]);
  assert.equal(document.querySelector('.header-phone').getAttribute('href'), 'tel:+919911109040');
  assert.match(
    document.querySelector('#contact .button').getAttribute('href'),
    /^mailto:sandeep@cromptechindia\.com\?subject=/,
  );
  assert.equal(document.querySelector('a[href="tel:+919884019019"]'), null);
  assert.equal(document.querySelector('a[href^="mailto:srini@trust.co.in"]'), null);
  page.window.close();
});
