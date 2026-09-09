import { readFile, stat, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const root = path.resolve('out');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
assert.match(html, /<html lang="en"/);
assert.doesNotMatch(html, /class="language-toggle"/);
assert.match(html, /formsubmit.co\/amir.shamani@gmail.com/);
assert.match(html, /name="message"/);
assert.match(html, /line-arrow/);
assert.match(html, /Amir Shamani\. All rights reserved\./);
assert.doesNotMatch(html, /may not be reproduced/);
assert.match(html, /href="\/favicon\.svg/);
await stat(path.join(root, 'Amir-Shamani-CV-Web.webp'));
assert.match(await readFile('app/cv-viewer.tsx', 'utf8'), /Amir-Shamani-CV-Web\.webp/);
assert.doesNotMatch(await readFile('app/page.tsx', 'utf8'), /Amir-Shamani-CV\.pdf/);
const youtubeGallery = await readFile('app/youtube-gallery.tsx', 'utf8');
for (const video of ['UcIaaAsZbNQ','kBtZKAc581c','PYp8ftdC-Lw','Hq1kjCIE1tE','cnT-m4wspdY','62fUfbJKM_A','3052bnP1KhQ','TYdYxblhzgE','NsTqQDEzM1c','Up19Bxxa5_8']) {
  assert.ok(youtubeGallery.includes(video), `Missing YouTube video: ${video}`);
}
assert.match(youtubeGallery, /slice\(0, 4\)/);
assert.match(youtubeGallery, /Show More/);
assert.doesNotMatch(youtubeGallery, /className="video-card"[^>]*data-reveal/);
for (const title of ['Panto', 'Recip', 'Tensi']) assert.ok(html.includes(`Open project: ${title}`));
let checked = 0;
for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
  const url = match[1];
  if (url === '/') continue;
  const file = path.join(root, decodeURIComponent(url));
  assert.ok((await stat(file)).isFile(), `Missing asset: ${url}`);
  checked++;
}
const gallery = await readFile('app/project-gallery.tsx', 'utf8');
for (const match of gallery.matchAll(/pages: \[([\d,]+)\]/g)) {
  for (const page of match[1].split(',')) await stat(path.join(root, `projects/source/page-${page}.jpg`));
}
for (const file of await readdir('public/projects')) {
  if (file.endsWith('.webp') && !file.endsWith('-outline.webp')) {
    await stat(path.join(root, 'projects', file.replace('.webp', '-outline.webp')));
  }
}
assert.equal(await readFile('public/images/homepage-interactive-system-wide-connected-clean.png').then(b=>b.length), await readFile('out/images/homepage-interactive-system-wide-connected-clean.png').then(b=>b.length));
console.log(`Static export verified: ${checked} page asset references, original project plates, outline pairs, English interface and contact form.`);
