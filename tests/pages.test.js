import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const pagesRoot = new URL('https://example.test/Com1pbx/');

async function checkLocalReference(reference, context) {
  if (reference.startsWith('#')) return false;

  const url = new URL(reference, context);
  if (url.origin !== pagesRoot.origin) return false;

  assert.ok(url.pathname.startsWith(pagesRoot.pathname), `${reference} escapes the project path`);
  const localPath = resolve(
    root,
    decodeURIComponent(url.pathname.slice(pagesRoot.pathname.length)),
  );
  assert.ok(localPath.startsWith(root + sep), `${reference} escapes the repository`);
  await access(localPath);
  return true;
}

test('GitHub Pages can serve every local HTML and CSS asset under the repository path', async () => {
  const html = await readFile(resolve(root, 'index.html'), 'utf8');
  const htmlReferences = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(
    (match) => match[1],
  );
  const checkedHtml = await Promise.all(
    htmlReferences.map((reference) => checkLocalReference(reference, pagesRoot)),
  );
  assert.ok(checkedHtml.filter(Boolean).length >= 10);

  const sourceSets = [...html.matchAll(/srcset=["']([^"']+)["']/g)].flatMap((match) =>
    match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]),
  );
  const checkedSources = await Promise.all(
    sourceSets.map((reference) => checkLocalReference(reference, pagesRoot)),
  );
  assert.ok(checkedSources.filter(Boolean).length >= 24);

  const stylesheet = await readFile(resolve(root, 'src/style.css'), 'utf8');
  const cssReferences = [...stylesheet.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map(
    (match) => match[1],
  );
  const cssUrl = new URL('src/style.css', pagesRoot);
  const checkedCss = await Promise.all(
    cssReferences.map((reference) => checkLocalReference(reference, cssUrl)),
  );
  assert.ok(checkedCss.filter(Boolean).length >= 2);
  await access(resolve(root, '.nojekyll'));
});

test('directly served browser scripts have no build-only imports', async () => {
  for (const path of ['src/main.js', 'src/react-loader.js', 'vendor/react-ui.js']) {
    const script = await readFile(resolve(root, path), 'utf8');
    assert.doesNotMatch(script, /^\s*import\s+['"](?:@|[^./])/m);
    assert.doesNotMatch(script, /^\s*import\s+['"][^'"]+\.css['"]/m);
    assert.doesNotMatch(script, /^\s*import\s+.+?\s+from\s+['"](?:@|[^./])/m);
  }
});
