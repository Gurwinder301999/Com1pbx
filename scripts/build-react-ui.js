import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { build } from 'esbuild';

await mkdir('vendor', { recursive: true });

const result = await build({
  entryPoints: ['src/react-ui.jsx'],
  outfile: 'vendor/react-ui.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  minify: true,
  legalComments: 'external',
  metafile: true,
  define: { 'process.env.NODE_ENV': '"production"' },
});

const legalPath = 'vendor/react-ui.js.LEGAL.txt';
const legalNotices = await readFile(legalPath, 'utf8');
await writeFile(legalPath, legalNotices.replaceAll('\t', '  '));

function cssBlock(source, selector) {
  const start = source.indexOf(selector);
  if (start === -1) throw new Error(`Animate.css rule not found: ${selector}`);

  let depth = 0;
  for (let index = start; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}' && --depth === 0) return source.slice(start, index + 1);
  }
  throw new Error(`Incomplete Animate.css rule: ${selector}`);
}

const animationCss = await readFile('node_modules/animate.css/animate.min.css', 'utf8');
const animationRules = [
  ':root{',
  '.animate__animated{',
  '@media (prefers-reduced-motion:reduce),print{',
  '@-webkit-keyframes fadeInUp{',
  '@keyframes fadeInUp{',
  '.animate__fadeInUp{',
];
await writeFile(
  'vendor/animate.min.css',
  `${animationRules.map((rule) => cssBlock(animationCss, rule)).join('\n')}\n`,
);

const packages = new Set(['animate.css']);
for (const input of Object.keys(result.metafile.inputs)) {
  const parts = input.replaceAll('\\', '/').split('/');
  if (parts[0] !== 'node_modules') continue;
  packages.add(parts[1].startsWith('@') ? `${parts[1]}/${parts[2]}` : parts[1]);
}

const licenses = [];
for (const name of [...packages].sort()) {
  const directory = resolve('node_modules', name);
  const metadata = JSON.parse(await readFile(resolve(directory, 'package.json'), 'utf8'));
  let license = '';
  for (const filename of ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'license', 'license.md']) {
    try {
      license = await readFile(resolve(directory, filename), 'utf8');
      break;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  if (!license) throw new Error(`License not found for ${name}`);
  licenses.push(`${name} ${metadata.version}\n\n${license.trim()}`);
}
await writeFile('vendor/THIRD_PARTY_LICENSES.txt', `${licenses.join('\n\n---\n\n')}\n`);
