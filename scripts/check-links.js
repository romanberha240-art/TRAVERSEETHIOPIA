const fs = require('fs');
const path = require('path');

function checkLinks(dir) {
  const files = [];
  walk(dir, files);
  let issues = 0;

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const hrefs = [...content.matchAll(/href=["']([^"']+)["']/g)].map((match) => match[1]);

    hrefs.forEach((link) => {
      if (!link.startsWith('http') && !link.startsWith('#') && !link.startsWith('mailto:') && !link.startsWith('tel:')) {
        const target = path.join(dir, link);
        if (!fs.existsSync(target)) {
          console.log(`Missing file: ${link} referenced from ${file}`);
          issues += 1;
        }
      }
    });
  });

  console.log(`Link check complete. Issues found: ${issues}`);
}

function walk(dir, result) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, result);
    } else if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.css')) {
      result.push(fullPath);
    }
  }
}

checkLinks(path.join(__dirname, '..'));
