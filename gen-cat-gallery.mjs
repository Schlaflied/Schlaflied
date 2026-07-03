// Regenerates the CAT-GALLERY block in README.md from whatever image files
// are in assets/cats/. Run after adding/removing photos: node gen-cat-gallery.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const README = './README.md';
const CATS_DIR = './assets/cats';
const START = '<!-- CAT-GALLERY:START -->';
const END = '<!-- CAT-GALLERY:END -->';
const IMG_EXT = /\.(jpe?g|png|gif|webp)$/i;

const files = readdirSync(CATS_DIR)
  .filter((f) => IMG_EXT.test(f))
  .sort();

if (files.length === 0) {
  console.error(`gen-cat-gallery: no images found in ${CATS_DIR}`);
  process.exit(1);
}

const tags = files
  .map((f, i) => `<img src="./assets/cats/${f}" width="150" alt="cat ${i + 1}" />`)
  .join('\n');

const readme = readFileSync(README, 'utf-8');
const startIdx = readme.indexOf(START);
const endIdx = readme.indexOf(END);
if (startIdx === -1 || endIdx === -1) {
  console.error('gen-cat-gallery: markers not found in README.md');
  process.exit(1);
}

const updated =
  readme.slice(0, startIdx + START.length) +
  '\n' +
  tags +
  '\n' +
  readme.slice(endIdx);

writeFileSync(README, updated);
console.log(`gen-cat-gallery: wrote ${files.length} cat photos into README.md`);
