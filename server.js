require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { healthHandler, galleryHandler, inquiryHandler, contentHandler, adminLoginHandler, adminContentHandler } = require('./lib/handlers');

const port = Number(process.env.PORT) || 3000;
const rootDir = path.resolve(__dirname);
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon'
};

function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,HEAD,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
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
  if (req.method === 'OPTIONS') { applyCors(res); return res.writeHead(204).end(); }
  if (url.pathname === '/api/health' && ['GET', 'HEAD'].includes(req.method)) return healthHandler(req, res);
  if (url.pathname === '/api/gallery' && ['GET', 'HEAD'].includes(req.method)) return galleryHandler(req, res);
  if (url.pathname === '/api/content' && ['GET', 'HEAD'].includes(req.method)) return contentHandler(req, res, url.searchParams);
  if (url.pathname === '/api/inquiry' && req.method === 'POST') return inquiryHandler(req, res);
  if (url.pathname === '/api/admin/login' && req.method === 'POST') return adminLoginHandler(req, res);
  if (url.pathname === '/api/admin/content' && ['GET', 'POST'].includes(req.method)) return adminContentHandler(req, res, url.searchParams);
  if (url.pathname.startsWith('/api/admin/content/') && ['PUT', 'DELETE'].includes(req.method)) return adminContentHandler(req, res, url.searchParams, url.pathname.split('/').pop());
  if (!['GET', 'HEAD'].includes(req.method)) return res.writeHead(405, { Allow: 'GET, HEAD, POST, PUT, DELETE, OPTIONS' }).end('Method not allowed');
  const filePath = resolveRequestPath(url.pathname);
  if (!filePath) return res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Forbidden');
  return sendFile(res, filePath, req.method === 'HEAD');
});
server.listen(port, '0.0.0.0', () => console.log(`Traverse Ethiopia server running on http://localhost:${port}`));
