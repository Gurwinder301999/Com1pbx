import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const html = await readFile(resolve(root, 'index.html'), 'utf8');

function normalizedText(element) {
  return element.textContent.replace(/\s+/g, ' ').trim();
}

test('server details explain the sourced hardware and ordering conditions', () => {
  const page = new JSDOM(html);
  const section = page.window.document.querySelector('#server-details');
  assert.ok(section);
  assert.equal(section.getAttribute('aria-labelledby'), 'server-details-title');
  assert.equal(section.querySelectorAll('.server-detail-card').length, 6);

  const [platform, storage, network, workload, maintenance, confirmation] = [
    ...section.querySelectorAll('.server-detail-card'),
  ].map(normalizedText);
  assert.match(platform, /2U metal cabinet.*rack-mounting kit/);
  assert.match(platform, /PowerX or equivalent H81 motherboard/);
  assert.match(platform, /Intel i3 below 5th generation.*DDR3 PCL RAM/);
  assert.match(platform, /Fingers or equivalent Mini ATX power supply/);
  assert.match(storage, /256 GB NVMe SSD.*Crucial or equivalent/);
  assert.match(storage, /up to 40,000 hours/);
  assert.match(storage, /when ordering at an additional cost/);
  assert.match(network, /onboard network card.*gigabit, single-port PCI Express LAN card/);
  assert.match(network, /Extra cards.*specified when ordering and cost extra/);
  assert.match(workload, /up to 2,000 extensions.*up to 25 agents/);
  assert.match(maintenance, /globally available components.*local maintenance/);
  assert.match(maintenance, /database backup and restore/);
  assert.match(confirmation, /RAM capacity.*processor model.*wattage are not stated/);
  assert.match(
    normalizedText(section.querySelector('.deployment-note')),
    /mission-critical operations, or predictive dialing or ACD with more than 25 agents.*own high-performance hardware/,
  );
  assert.doesNotMatch(normalizedText(section), /multicast|speakers|background music|paging/i);

  const source = section.querySelector('a[href^="https://com1pbx.com/"]');
  assert.equal(source.getAttribute('rel'), 'noopener noreferrer');
  assert.equal(
    page.window.document.querySelector('a[href="#server-details"]').textContent.trim(),
    'EXPLORE SERVER DETAILS',
  );
  page.window.close();
});

test('all in-page navigation links point to existing IDs', () => {
  const page = new JSDOM(html);
  const document = page.window.document;
  for (const link of document.querySelectorAll('a[href^="#"]')) {
    const target = link.getAttribute('href').slice(1);
    assert.ok(document.getElementById(target), `Missing target for #${target}`);
  }
  page.window.close();
});
