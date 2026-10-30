import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import { loadWhenNear } from '../src/react-loader.js';
import viteConfig from '../vite.config.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const html = await readFile(resolve(root, 'index.html'), 'utf8');

test('the React enhancement loads only once as the table approaches', () => {
  const target = {};
  let observer;
  let loads = 0;

  class Observer {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.disconnects = 0;
      observer = this;
    }
    observe(element) {
      this.target = element;
    }
    disconnect() {
      this.disconnects += 1;
    }
  }

  loadWhenNear(
    target,
    () => {
      loads += 1;
    },
    Observer,
  );
  assert.equal(observer.target, target);
  assert.equal(observer.options.rootMargin, '900px 0px');
  assert.equal(loads, 0);
  observer.callback([{ isIntersecting: false }]);
  assert.equal(loads, 0);
  observer.callback([{ isIntersecting: true }]);
  observer.callback([{ isIntersecting: true }]);
  assert.equal(loads, 1);
  assert.equal(observer.disconnects, 1);
});

test('the table enhancement loads without IntersectionObserver and ignores a missing target', () => {
  let loads = 0;
  loadWhenNear(
    {},
    () => {
      loads += 1;
    },
    undefined,
  );
  assert.equal(loads, 1);
  loadWhenNear(
    null,
    () => {
      loads += 1;
    },
    undefined,
  );
  assert.equal(loads, 1);
});

test('critical assets are small and the React bundle is deferred', async () => {
  const document = new JSDOM(html).window.document;
  const scripts = [...document.querySelectorAll('script[src]')].map((script) =>
    script.getAttribute('src'),
  );
  assert.ok(scripts.includes('./src/react-loader.js'));
  assert.ok(!scripts.includes('./vendor/react-ui.js'));
  assert.ok(document.querySelector('link[rel="preload"][as="font"][crossorigin]'));
  assert.ok(document.querySelector('link[rel="preload"][as="image"][fetchpriority="high"]'));
  assert.equal(viteConfig.build.assetsInlineLimit, 0);
  const animation = await stat(resolve(root, 'vendor/animate.min.css'));
  assert.ok(animation.size < 2048, `Animation stylesheet is ${animation.size} bytes`);
  const loader = await readFile(resolve(root, 'src/react-loader.js'), 'utf8');
  assert.match(loader, /import\('\.\.\/vendor\/react-ui\.js'\)/);
});

test('responsive image variants match their descriptors and save bytes', async () => {
  const document = new JSDOM(html).window.document;
  const images = [...document.querySelectorAll('img')];
  assert.equal(images.length, 6);

  for (const image of images) {
    assert.equal(image.getAttribute('loading'), 'lazy');
    assert.equal(image.getAttribute('decoding'), 'async');
    assert.equal(image.getAttribute('fetchpriority'), 'low');
    assert.ok(image.getAttribute('sizes'));
    const sourceSize = (await stat(resolve(root, image.getAttribute('src')))).size;
    const candidates = image.getAttribute('srcset').split(',');
    assert.equal(candidates.length, 4);
    for (const candidate of candidates) {
      const [path, descriptor] = candidate.trim().split(/\s+/);
      const metadata = await sharp(resolve(root, path)).metadata();
      assert.equal(metadata.width, Number.parseInt(descriptor, 10));
      assert.ok((await stat(resolve(root, path))).size < sourceSize);
    }
  }
});
