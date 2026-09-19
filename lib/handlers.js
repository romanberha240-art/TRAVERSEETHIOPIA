const gallery = [
  {
    title: 'Bale Mountains',
    category: 'Birding',
    image: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=1200&q=80',
    alt: 'Birding in Bale Mountains',
  },
  {
    title: 'Omo Valley',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=80',
    alt: 'Tribal culture in Omo Valley',
  },
  {
    title: 'Lalibela',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    alt: 'Rock-hewn churches of Lalibela',
  },
  {
    title: 'Danakil',
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
    alt: 'Danakil Depression landscape',
  },
  {
    title: 'Simien Mountains',
    category: 'Hiking',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    alt: 'Simien Mountains trek',
  },
  {
    title: 'Addis Ababa',
    category: 'City',
    image: 'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?w=1200&q=80',
    alt: 'Addis Ababa city view',
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
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        try {
          const params = new URLSearchParams(body);
          const parsed = {};
          params.forEach((value, key) => {
            parsed[key] = value;
          });
          resolve(parsed);
        } catch (innerError) {
          reject(new Error('Invalid request body'));
        }
      }
    });

    req.on('error', reject);
  });
}

function healthHandler(req, res) {
  sendJson(res, 200, {
    ok: true,
    message: 'Traverse Ethiopia API is healthy',
    service: 'traverse-ethiopia',
    timestamp: new Date().toISOString(),
  });
}

async function inquiryHandler(req, res) {
  try {
    const body = await readBody(req);
    const cleaned = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      tour: String(body.tour || '').trim(),
      dates: String(body.dates || '').trim(),
      people: String(body.people || '').trim(),
      budget: String(body.budget || '').trim(),
      message: String(body.message || '').trim(),
    };

    if (!cleaned.name || !cleaned.email || !cleaned.message) {
      sendJson(res, 400, {
        ok: false,
        message: 'Name, email, and message are required.',
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      message: 'Inquiry received successfully. Our team will get back to you shortly.',
      inquiry: cleaned,
    });
  } catch (error) {
    sendJson(res, 400, {
      ok: false,
      message: 'Could not parse inquiry. Please try again.',
    });
  }
}

function galleryHandler(req, res) {
  sendJson(res, 200, {
    ok: true,
    items: gallery,
  });
}

module.exports = {
  address: 'traverse-ethiopia',
  gallery,
  healthHandler,
  inquiryHandler,
  galleryHandler,
};
