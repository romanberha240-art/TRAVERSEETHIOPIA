const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { healthHandler, galleryHandler, inquiryHandler } = require('./lib/handlers');

const port = Number(process.env.PORT) || 3000;
const rootDir = path.resolve(__dirname);
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.ico': 'image/x-icon', '.webp': 'image/webp', '.txt': 'text/plain; charset=utf-8', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };

function sendFile(res, filePath, headOnly = false) {
  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) return res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream', 'Content-Length': stats.size, 'X-Content-Type-Options': 'nosniff' });
    if (headOnly) return res.end();
    fs.createReadStream(filePath).on('error', () => res.destroy()).pipe(res);
  });
}

function resolveRequestPath(pathname) {
  let cleanPath;
  try { cleanPath = decodeURIComponent(pathname || '/'); } catch (_) { return null; }
  const requested = cleanPath === '/' ? '/index.html' : cleanPath.endsWith('/') ? `${cleanPath}index.html` : cleanPath;
  const candidate = path.resolve(rootDir, `.${requested}`);
  if (candidate !== rootDir && !candidate.startsWith(`${rootDir}${path.sep}`)) return null;
  if (!path.extname(candidate) && fs.existsSync(`${candidate}.html`)) return `${candidate}.html`;
  return candidate;
}

const server = http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, `http://${req.headers.host || 'localhost'}`); } catch (_) { return res.writeHead(400).end('Bad request'); }
  if (req.method === 'OPTIONS') return res.writeHead(204, { 'Access-Control-Allow-Methods': 'GET,POST,HEAD,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }).end();
  if (url.pathname === '/api/health' && (req.method === 'GET' || req.method === 'HEAD')) return healthHandler(req, res);
  if (url.pathname === '/api/gallery' && (req.method === 'GET' || req.method === 'HEAD')) return galleryHandler(req, res);
  if (url.pathname === '/api/inquiry' && req.method === 'POST') return inquiryHandler(req, res);
  if (!['GET', 'HEAD'].includes(req.method)) return res.writeHead(405, { Allow: 'GET, HEAD, OPTIONS' }).end('Method not allowed');
  const filePath = resolveRequestPath(url.pathname);
  if (!filePath) return res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Forbidden');
  return sendFile(res, filePath, req.method === 'HEAD');
});

server.listen(port, '0.0.0.0', () => console.log(`Traverse Ethiopia server running on http://localhost:${port}`));
