import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));

function runPageScript(script, motionAllowed) {
  const documentClasses = new Set();
  const targetClasses = new Set();
  const target = { classList: { add: (name) => targetClasses.add(name) } };
  const menu = {
    addEventListener() {},
    getAttribute: () => 'false',
    setAttribute() {},
    focus() {},
  };
  const navigation = {
    addEventListener() {},
    classList: { toggle() {} },
  };
  let observer;

  class IntersectionObserverMock {
    constructor(callback) {
      this.callback = callback;
      this.observed = [];
      this.unobserved = [];
      observer = this;
    }
    observe(element) {
      this.observed.push(element);
    }
    unobserve(element) {
      this.unobserved.push(element);
    }
  }

  const document = {
    querySelector: (selector) => (selector === '.menu-toggle' ? menu : navigation),
    querySelectorAll: () => [target],
    addEventListener() {},
    documentElement: { classList: { add: (name) => documentClasses.add(name) } },
  };
  const window = {
    IntersectionObserver: IntersectionObserverMock,
    matchMedia: () => ({ matches: motionAllowed }),
  };
  runInNewContext(script, { document, window, IntersectionObserver: IntersectionObserverMock });
  return { documentClasses, targetClasses, target, observer };
}

test('the website uses Comone branding without changing the source URL', async () => {
  const html = await readFile(resolve(root, 'index.html'), 'utf8');
  assert.match(html, /<title>Comone \| Hardware Appliance<\/title>/);
  assert.match(html, /COM<span>ONE<\/span>/);
  assert.doesNotMatch(html, /\b(?:Com1|COM1)\b/);
  assert.match(html, /https:\/\/com1pbx\.com\//);
});

test('scroll reveals activate only when motion is allowed', async () => {
  const script = await readFile(resolve(root, 'src/main.js'), 'utf8');
  const allowed = runPageScript(script, true);
  assert.ok(allowed.documentClasses.has('motion-ready'));
  assert.deepEqual(allowed.observer.observed, [allowed.target]);
  allowed.observer.callback([{ isIntersecting: true, target: allowed.target }], allowed.observer);
  assert.ok(allowed.targetClasses.has('is-visible'));
  assert.deepEqual(allowed.observer.unobserved, [allowed.target]);

  const reduced = runPageScript(script, false);
  assert.equal(reduced.observer, undefined);
  assert.equal(reduced.documentClasses.has('motion-ready'), false);
});
