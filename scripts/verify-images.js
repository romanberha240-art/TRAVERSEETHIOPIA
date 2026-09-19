const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}

walk(root);

let imageIssues = 0;
htmlFiles.forEach((file) => {
  const text = fs.readFileSync(file, 'utf8');
  const imageMatches = [...text.matchAll(/src=["']([^"']+)["']/g)].map((match) => match[1]);
  imageMatches.forEach((src) => {
    if (!src.startsWith('http') && !src.startsWith('data:')) {
      const target = path.join(root, src);
      if (!fs.existsSync(target)) {
        console.log(`Missing image: ${src} in ${file}`);
        imageIssues += 1;
      }
    }
  });
});

console.log(`Image verification complete. Missing image references: ${imageIssues}`);
