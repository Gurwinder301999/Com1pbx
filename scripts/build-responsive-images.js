import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

await mkdir('images/responsive', { recursive: true });

const images = [
  { name: 'appliance-rack', widths: [320, 384, 640, 960] },
  { name: 'appliance-storage', widths: [320, 384, 640, 960] },
  { name: 'appliance-network', widths: [320, 384, 640, 960] },
  { name: 'appliance-components', widths: [320, 384, 640, 960] },
  { name: 'appliance-detail', widths: [480, 720, 960, 1440] },
  { name: 'appliance-connectivity', widths: [480, 720, 960, 1440] },
];

for (const { name, widths } of images) {
  for (const width of widths) {
    await sharp(`images/${name}.webp`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 75, effort: 5 })
      .toFile(`images/responsive/${name}-${width}.webp`);
  }
}
