import { mkdir, readFile, writeFile } from 'node:fs/promises';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

await mkdir('icons', { recursive: true });
const source = await readFile('favicon.svg');

for (const size of [16, 32, 48]) {
  await sharp(source, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(`icons/favicon-${size}x${size}.png`);
}

await sharp(source, { density: 384 })
  .resize(180, 180)
  .flatten({ background: '#0d0e10' })
  .png({ compressionLevel: 9 })
  .toFile('icons/apple-touch-icon.png');

const icon = await pngToIco([
  'icons/favicon-16x16.png',
  'icons/favicon-32x32.png',
  'icons/favicon-48x48.png',
]);
await writeFile('favicon.ico', icon);
