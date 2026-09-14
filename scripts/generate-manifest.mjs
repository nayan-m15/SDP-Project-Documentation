import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsRoot = path.join(root, 'docs');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(target) : entry.isFile() && entry.name.endsWith('.md') ? [target] : [];
});
const slash = (value) => value.split(path.sep).join('/');

const manifest = walk(docsRoot).sort().map((file) => {
  const relative = slash(path.relative(root, file));
  const source = fs.readFileSync(file, 'utf8');
  const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const stat = fs.statSync(file);
  return {
    name: heading || path.basename(file, '.md').replaceAll('-', ' '),
    path: relative,
    originalPath: relative,
    folder: relative.split('/')[1] || 'General',
    size: stat.size,
    date: stat.mtime.toISOString(),
    type: 'md'
  };
});

fs.writeFileSync(path.join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated manifest.json with ${manifest.length} Markdown entries.`);
