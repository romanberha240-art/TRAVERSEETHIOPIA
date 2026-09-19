const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const {
  healthHandler,
  galleryHandler,
  inquiryHandler,
} = require('./lib/handlers');

const port = process.env.PORT || 3000;
const rootDir = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    });
    res.end(data);
  });
}

function resolveRequestPath(requestPath) {
  if (!requestPath || requestPath === '/') {
    return path.join(rootDir, 'index.html');
  }

  const cleanPath = decodeURIComponent(requestPath);

  if (cleanPath.endsWith('/')) {
    return path.join(rootDir, cleanPath, 'index.html');
  }

  const filePath = path.join(rootDir, cleanPath);
  const extension = path.extname(filePath);

  if (extension === '') {
    const candidate = `${filePath}.html`;
    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const folderCandidate = path.join(filePath, 'index.html');
    if (fs.existsSync(folderCandidate)) {
      return folderCandidate;
    }
  }

  return filePath;
}

const server = http.createServer(async (req, res) => {
  const { pathname, query } = parse(req.url, true);

  try {
    if (pathname === '/api/health' && req.method === 'GET') {
      return healthHandler(req, res);
    }

    if (pathname === '/api/gallery' && req.method === 'GET') {
      return galleryHandler(req, res);
    }

    if (pathname === '/api/inquiry' && req.method === 'POST') {
      return inquiryHandler(req, res);
    }

    const unsafePath = path.join(rootDir, decodeURIComponent(pathname || '/'));
    if (!unsafePath.startsWith(rootDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    const filePath = resolveRequestPath(pathname);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Page not found');
      return;
    }

    sendFile(res, filePath);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'Server error' }));
  }
});

server.listen(port, () => {
  console.log(`Traverse Ethiopia server running on http://localhost:${port}`);
});
