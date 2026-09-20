const gallery = [
  { title: 'Bale Mountains', category: 'Birding', image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Bale_mountains.jpg', alt: 'Sanetti Plateau in the Bale Mountains, Ethiopia', credit: 'Photo: Rod Waddington / Wikimedia Commons' },
  { title: 'Omo Valley', category: 'Culture', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hamar_woman.jpg', alt: 'Hamar woman in Ethiopia’s Omo Valley', credit: 'Photo: Bernard Gagnon / Wikimedia Commons' },
  { title: 'Lalibela', category: 'Heritage', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Bete_Giyorgis%2C_Lalibela%2C_Ethiopia.jpg', alt: 'Bete Giyorgis rock-hewn church in Lalibela' },
  { title: 'Danakil', category: 'Adventure', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Danakil_Depression_Ethiopia.jpg', alt: 'Danakil Depression in Ethiopia' },
  { title: 'Simien Mountains', category: 'Hiking', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Simien_Mountains%2C_Ethiopia.jpg', alt: 'Simien Mountains in Ethiopia' },
  { title: 'Addis Ababa', category: 'City', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Addis_Ababa%2C_Ethiopia.jpg', alt: 'Addis Ababa, Ethiopia' }
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > 1e6) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { return resolve(JSON.parse(body)); } catch (_) {}
      try {
        const parsed = {};
        new URLSearchParams(body).forEach((value, key) => { parsed[key] = value; });
        resolve(parsed);
      } catch (_) { reject(new Error('Invalid request body')); }
    });
    req.on('error', reject);
  });
}

function healthHandler(req, res) { sendJson(res, 200, { ok: true, message: 'Traverse Ethiopia API is healthy', service: 'traverse-ethiopia', timestamp: new Date().toISOString() }); }
function galleryHandler(req, res) { sendJson(res, 200, { ok: true, items: gallery }); }

async function inquiryHandler(req, res) {
  try {
    const body = await readBody(req);
    const fields = ['name', 'email', 'phone', 'tour', 'dates', 'people', 'budget', 'message'];
    const cleaned = Object.fromEntries(fields.map((key) => [key, String(body[key] ?? '').trim()]));
    if (!cleaned.name || !cleaned.email) return sendJson(res, 400, { ok: false, error: 'Name and email are required.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)) return sendJson(res, 400, { ok: false, error: 'Please enter a valid email address.' });
    console.log('New tour inquiry:', JSON.stringify({ ...cleaned, receivedAt: new Date().toISOString() }));
    return sendJson(res, 200, { ok: true, message: 'Thanks — your request has been received. We will contact you shortly.' });
  } catch (error) { return sendJson(res, 400, { ok: false, error: error.message || 'Invalid request.' }); }
}

module.exports = { gallery, healthHandler, galleryHandler, inquiryHandler };