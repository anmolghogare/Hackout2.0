const http = require('http');
const {
  getBaseline,
  calculateSimulation,
  getCopilotResponse,
  getCircularMatches,
  getRoadmap,
  getRegressionCharts
} = require('./controllers/mainController');

const PORT = process.env.PORT || 5000;

// Helper to set CORS headers & send JSON
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Request Handler
const requestHandler = (req, res) => {
  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Helper response wrapper matching express res.json
  const resWrapper = {
    json: (data) => sendJSON(res, 200, data),
    status: (code) => ({
      json: (data) => sendJSON(res, code, data)
    })
  };

  // GET /health
  if (url.pathname === '/health' && req.method === 'GET') {
    return resWrapper.json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // GET /api/facility/baseline
  if (url.pathname === '/api/facility/baseline' && req.method === 'GET') {
    return getBaseline(req, resWrapper);
  }

  // GET /api/circular/matches
  if (url.pathname === '/api/circular/matches' && req.method === 'GET') {
    return getCircularMatches(req, resWrapper);
  }

  // GET /api/roadmap
  if (url.pathname === '/api/roadmap' && req.method === 'GET') {
    return getRoadmap(req, resWrapper);
  }

  // GET /api/charts/whatif
  if (url.pathname === '/api/charts/whatif' && req.method === 'GET') {
    return getRegressionCharts(req, resWrapper);
  }

  // POST /api/simulation/calculate
  if (url.pathname === '/api/simulation/calculate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        req.body = body ? JSON.parse(body) : {};
      } catch (e) {
        req.body = {};
      }
      calculateSimulation(req, resWrapper);
    });
    return;
  }

  // POST /api/copilot/query
  if (url.pathname === '/api/copilot/query' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        req.body = body ? JSON.parse(body) : {};
      } catch (e) {
        req.body = {};
      }
      getCopilotResponse(req, resWrapper);
    });
    return;
  }

  // Fallback 404
  sendJSON(res, 404, { success: false, error: 'Endpoint not found' });
};

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`🚀 Industrial Carbon Intelligence Server running on port ${PORT}`);
  });
}

module.exports = server;
