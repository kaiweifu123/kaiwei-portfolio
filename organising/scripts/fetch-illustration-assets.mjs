/**
 * One-off Cargo asset fetcher for the illustration portfolio.
 * Run this again when new Cargo-hosted illustration work is added to
 * src/components/IllustrationPage.tsx.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sourcePath = 'src/components/IllustrationPage.tsx';
const outputRoot = 'public/illustration';

const mimeToExtension = {
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function extractProjects(source) {
  const match = source.match(/export const illustrationProjects: IllustrationProject\[\] = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error('Could not find illustrationProjects array in IllustrationPage.tsx');
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function cargoAssetUrl(media, width) {
  return `https://freight.cargo.site/w/${width}/i/${media.hash}/${encodeURIComponent(media.name)}`;
}

async function download(url, filePath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed ${response.status} ${response.statusText}: ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(filePath, buffer);
  return buffer.byteLength;
}

const source = await readFile(sourcePath, 'utf8');
const projects = extractProjects(source);
const manifest = [];

for (const project of projects) {
  const projectDir = path.join(outputRoot, project.slug);
  await mkdir(projectDir, { recursive: true });

  const coverExt = mimeToExtension[project.cover.mime] ?? path.extname(project.cover.name).replace('.', '').toLowerCase();
  const coverWidth = project.cover.mime === 'image/gif' ? 760 : 800;
  const coverPath = path.join(projectDir, `cover.${coverExt}`);
  const coverBytes = await download(cargoAssetUrl(project.cover, coverWidth), coverPath);

  const mediaEntries = [];
  for (const [index, media] of project.media.entries()) {
    const ext = mimeToExtension[media.mime] ?? path.extname(media.name).replace('.', '').toLowerCase();
    const width = media.mime === 'image/gif' ? 760 : 1600;
    const filename = `${String(index + 1).padStart(2, '0')}.${ext}`;
    const filePath = path.join(projectDir, filename);
    const bytes = await download(cargoAssetUrl(media, width), filePath);

    mediaEntries.push({
      index: index + 1,
      source: cargoAssetUrl(media, width),
      path: `/${filePath}`,
      bytes,
      width: media.width,
      height: media.height,
      mime: media.mime,
    });
  }

  manifest.push({
    slug: project.slug,
    cover: {
      source: cargoAssetUrl(project.cover, coverWidth),
      path: `/${coverPath}`,
      bytes: coverBytes,
      width: project.cover.width,
      height: project.cover.height,
      mime: project.cover.mime,
    },
    media: mediaEntries,
  });
}

await writeFile(path.join(outputRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\\n`);

const totalBytes = manifest.reduce((projectTotal, project) => (
  projectTotal + project.cover.bytes + project.media.reduce((sum, media) => sum + media.bytes, 0)
), 0);

console.log(`Downloaded ${manifest.length} illustration projects to ${outputRoot}`);
console.log(`Total downloaded: ${(totalBytes / 1048576).toFixed(2)} MB`);
