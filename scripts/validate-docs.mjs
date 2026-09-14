import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const slash = (value) => value.split(path.sep).join('/');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const target = path.join(dir, entry.name);
  return entry.isDirectory() && entry.name !== '.git' && entry.name !== 'node_modules'
    ? walk(target)
    : entry.isFile() ? [target] : [];
});

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  if (!Array.isArray(manifest)) throw new Error('root must be an array');
} catch (error) {
  console.error(`manifest.json is invalid: ${error.message}`);
  process.exit(1);
}

const seen = new Set();
for (const entry of manifest) {
  if (seen.has(entry.path)) errors.push(`duplicate manifest path: ${entry.path}`);
  seen.add(entry.path);
  if (entry.type !== 'md') errors.push(`non-Markdown manifest type: ${entry.path}`);
  if (entry.originalPath !== entry.path) errors.push(`originalPath must match path: ${entry.path}`);
  const target = path.join(root, ...entry.path.split('/'));
  if (!fs.existsSync(target)) {
    errors.push(`missing manifest target: ${entry.path}`);
  } else if (fs.statSync(target).size !== entry.size) {
    errors.push(`wrong byte size: ${entry.path} (manifest ${entry.size}, actual ${fs.statSync(target).size})`);
  }
}

const markdownFiles = walk(path.join(root, 'docs'))
  .filter((file) => file.toLowerCase().endsWith('.md'))
  .map((file) => slash(path.relative(root, file)));
for (const file of markdownFiles) if (!seen.has(file)) errors.push(`unlisted Markdown file: ${file}`);

const linkPattern = /!?\[[^\]]*\]\(([^)]+)\)|<img\s+[^>]*src=["']([^"']+)["']/gi;
for (const relative of markdownFiles) {
  const absolute = path.join(root, ...relative.split('/'));
  const content = fs.readFileSync(absolute, 'utf8');
  for (const match of content.matchAll(linkPattern)) {
    let href = (match[1] || match[2] || '').trim().replace(/^<|>$/g, '');
    if (!href || /^(?:https?:|mailto:|tel:|data:|#)/i.test(href)) continue;
    href = decodeURIComponent(href.split('#')[0].split('?')[0]);
    const target = path.resolve(path.dirname(absolute), href);
    if (!fs.existsSync(target)) errors.push(`missing local link: ${relative} -> ${href}`);
  }
}

for (const file of walk(root)) {
  const relative = slash(path.relative(root, file));
  if (relative.toLowerCase().endsWith('.pdf')) errors.push(`remaining PDF: ${relative}`);
  if (relative === 'scripts/validate-docs.mjs' || relative.startsWith('.git/')) continue;
  if (/\.(?:md|html|js|json|css|ya?ml)$/i.test(relative)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('pdfs' + '/') || content.includes('pdfs' + '\\')) {
      errors.push(`legacy PDF-directory reference: ${relative}`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}
console.log(`Documentation validation passed: ${manifest.length} manifest entries, ${markdownFiles.length} Markdown files.`);
