const gallery = [
  {
    title: 'Bale Mountains',
    category: 'Birding',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/The_Sanetti_Plateau_in_the_Bale_Mountains%2C_Ethiopia.jpg',
    alt: 'Sanetti Plateau in the Bale Mountains, Ethiopia',
    credit: 'Photo: Rod Waddington / Wikimedia Commons',
  },
  {
    title: 'Omo Valley',
    category: 'Culture',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hamar_woman.jpg',
    alt: 'Hamar woman in Ethiopia’s Omo Valley',
    credit: 'Photo: Bernard Gagnon / Wikimedia Commons',
  },
  {
    title: 'Lalibela',
    category: 'Heritage',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Bete_Giyorgis%2C_Lalibela%2C_Ethiopia.jpg',
    alt: 'Bete Giyorgis rock-hewn church in Lalibela',
  },
  {
    title: 'Danakil',
    category: 'Adventure',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Danakil_Depression_Ethiopia.jpg',
    alt: 'Danakil Depression in Ethiopia',
  },
  {
    title: 'Simien Mountains',
    category: 'Hiking',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Simien_Mountains%2C_Ethiopia.jpg',
    alt: 'Simien Mountains in Ethiopia',
  },
  {
    title: 'Addis Ababa',
    category: 'City',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Addis_Ababa%2C_Ethiopia.jpg',
    alt: 'Addis Ababa, Ethiopia',
  },
];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.socket.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); }
      catch (error) {
        try {
          const params = new URLSearchParams(body);
          const parsed = {};
          params.forEach((value, key) => { parsed[key] = value; });
          resolve(parsed);
        } catch (innerError) { reject(new Error('Invalid request body')); }
      }
    });
    req.on('error', reject);
  });
}

function healthHandler(req, res) {
  sendJson(res, 200, { ok: true, message: 'Traverse Ethiopia API is healthy', service: 'traverse-ethiopia', timestamp: new Date().toISOString() });
}

async function inquiryHandler(req, res) {
  try {
    const body = await readBody(req);
    const cleaned = {};
    ['name', 'email', 'phone', 'tour', 'dates', 'people', 'budget', 'message'].forEach((key) => { cleaned[key] = String(body[key] || '').trim(); });
    if (!cleaned.name || !cleaned.email || !cleaned.message) return sendJson(res, 400, { ok: false, message: 'Name, email, and message are required.' });
    sendJson(res, 200, { ok: true, message: 'Inquiry received successfully. Our team will get back to you shortly.', inquiry: cleaned });
  } catch (error) { sendJson(res, 400, { ok: false, message: 'Could not parse inquiry. Please try again.' }); }
}

function galleryHandler(req, res) { sendJson(res, 200, { ok: true, items: gallery }); }

module.exports = { address: 'traverse-ethiopia', gallery, healthHandler, inquiryHandler, galleryHandler };
