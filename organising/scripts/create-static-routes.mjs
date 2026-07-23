import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const routes = [
  'preview.html',
  'product-design/index.html',
  'design-system/index.html',
  'patient-crm/index.html',
  'illustration/index.html',
  // Add new illustration slugs here so static preview and non-Vercel hosts resolve them.
  'illustration/kodak/index.html',
  'illustration/london-tube-sketch/index.html',
  'illustration/moments-from-the-tube/index.html',
  'illustration/london-life/index.html',
  'illustration/tarot/index.html',
  'illustration/autonomous-archive/index.html',
  'case/hireable/index.html',
  'case/reading-rep/index.html',
  'case/ohisama/index.html',
  'case/tfl-go/index.html',
  'case/design-system/index.html',
];

const distDir = join(process.cwd(), 'dist');
const source = join(distDir, 'index.html');

for (const route of routes) {
  const target = join(distDir, route);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}
