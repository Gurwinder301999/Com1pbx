import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { attachHeroDepth } from '../src/hero-3d.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const css = await readFile(resolve(root, 'src/style.css'), 'utf8');

function createHero(width = 1000, height = 600) {
  const listeners = new Map();
  const properties = new Map();

  return {
    listeners,
    properties,
    getBoundingClientRect: () => ({ left: 0, top: 0, width, height }),
    addEventListener(type, handler) {
      listeners.set(type, handler);
    },
    removeEventListener(type, handler) {
      if (listeners.get(type) === handler) listeners.delete(type);
    },
    style: {
      setProperty(name, value) {
        properties.set(name, value);
      },
      removeProperty(name) {
        properties.delete(name);
      },
    },
    emit(type, event = {}) {
      listeners.get(type)?.(event);
    },
  };
}

function createEnvironment({ fine = true, reduced = false, frames = [] } = {}) {
  const queries = [];
  const changes = new Map();

  function queryFor(expression, matches) {
    const query = {
      expression,
      matches,
      addEventListener(type, handler) {
        if (type === 'change') changes.set(expression, handler);
      },
      removeEventListener(type) {
        if (type === 'change') changes.delete(expression);
      },
    };
    queries.push(query);
    return query;
  }

  return {
    queries,
    changes,
    matchMedia(expression) {
      if (expression === '(pointer: fine)') return queryFor(expression, fine);
      if (expression === '(prefers-reduced-motion: reduce)') {
        return queryFor(expression, reduced);
      }
      return queryFor(expression, false);
    },
    requestAnimationFrame(callback) {
      frames.push(callback);
      return frames.length;
    },
    cancelAnimationFrame(id) {
      frames[id - 1] = null;
    },
  };
}

function flushFrames(frames) {
  for (const callback of frames.splice(0).filter(Boolean)) callback();
}

test('the hero exposes layered 3D visuals and a direct browser script', async () => {
  const page = new JSDOM(html);
  const document = page.window.document;
  const hero = document.querySelector('.hero');

  assert.ok(hero?.classList.contains('hero-3d'));
  const scene = hero.querySelector('.hero-scene');
  assert.ok(scene);
  assert.equal(scene.getAttribute('aria-hidden'), 'true');
  assert.ok(scene.querySelector('.hero-image'));
  assert.ok(scene.querySelector('.hero-depth-grid'));
  assert.ok(scene.querySelector('.hero-glare'));
  assert.ok(scene.querySelector('.hero-overlay'));
  assert.equal(scene.querySelectorAll('.hero-float').length, 3);
  assert.match(html, /<script type="module" src="\.\/src\/hero-3d\.js"><\/script>/);

  assert.match(css, /perspective:\s*1200px/);
  assert.match(css, /transform-style:\s*preserve-3d/);
  assert.match(css, /translateZ\(var\(--hero-float-depth/);
  assert.match(css, /@keyframes hero-drift[\s\S]*?background-position:\s*calc\(var\(--hero-image-x\)/);

  const reducedMotionBlock = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reducedMotionBlock, /\.hero-scene,/);
  assert.match(reducedMotionBlock, /transform:\s*none/);
  page.window.close();
});

test('pointer movement tilts the hero and leaving resets the scene', () => {
  const hero = createHero();
  const frames = [];
  const environment = createEnvironment({ frames });
  const controller = attachHeroDepth(hero, environment);

  assert.ok(controller);
  assert.equal(hero.listeners.size, 3);
  assert.equal(hero.properties.get('--hero-rotate-y'), '-2.0deg');

  hero.emit('pointermove', { pointerType: 'mouse', clientX: 900, clientY: 100 });
  assert.equal(frames.filter(Boolean).length, 1);
  flushFrames(frames);

  assert.equal(hero.properties.get('--hero-rotate-y'), '0.40deg');
  assert.equal(hero.properties.get('--hero-rotate-x'), '1.93deg');
  assert.equal(hero.properties.get('--hero-shift-x'), '-4.0px');
  assert.equal(hero.properties.get('--hero-shift-y'), '2.3px');
  assert.equal(hero.properties.get('--hero-glare-x'), '79.2%');
  assert.equal(hero.properties.get('--hero-glare-y'), '32.0%');

  hero.emit('pointermove', { pointerType: 'touch', clientX: 100, clientY: 500 });
  assert.equal(frames.filter(Boolean).length, 0);

  hero.emit('pointerleave');
  assert.equal(hero.properties.get('--hero-rotate-x'), '0.6deg');
  assert.equal(hero.properties.get('--hero-rotate-y'), '-2.0deg');
  assert.equal(hero.properties.get('--hero-shift-x'), '0px');
  assert.equal(hero.properties.get('--hero-glare-x'), '72%');

  controller.destroy();
  assert.equal(hero.listeners.size, 0);
});

test('reduced motion and coarse pointers keep the static scene without pointer listeners', () => {
  const coarseHero = createHero();
  const coarse = attachHeroDepth(coarseHero, createEnvironment({ fine: false }));
  assert.ok(coarse);
  assert.equal(coarseHero.listeners.size, 0);
  coarse.destroy();

  const reducedHero = createHero();
  const reducedEnvironment = createEnvironment({ reduced: true });
  const reduced = attachHeroDepth(reducedHero, reducedEnvironment);
  assert.ok(reduced);
  assert.equal(reducedHero.listeners.size, 0);

  const motionQuery = reducedEnvironment.queries.find(
    (query) => query.expression === '(prefers-reduced-motion: reduce)',
  );
  motionQuery.matches = false;
  reducedEnvironment.changes.get(motionQuery.expression)();
  assert.equal(reducedHero.listeners.size, 3);

  reduced.destroy();
  assert.equal(reducedHero.listeners.size, 0);
});

test('a missing hero cannot create a controller', () => {
  assert.equal(attachHeroDepth(null, createEnvironment()), null);
});
