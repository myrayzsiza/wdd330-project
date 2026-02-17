/**
 * Simple HTTP Server for Travel Planner
 * Serves static files on Render and locally
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const auth = require('./auth');

const PORT = process.env.PORT || 3000;

// MIME types mapping
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Helper function to parse request body
function parseRequestBody(req, callback) {
  let body = '';
  
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      callback(null, data);
    } catch (err) {
      callback(err, null);
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse the URL
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  // Handle API routes
  if (pathname === '/api/register' && req.method === 'POST') {
    parseRequestBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid request' }));
        return;
      }

      const result = auth.registerUser(data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
    return;
  }

  if (pathname === '/api/login' && req.method === 'POST') {
    parseRequestBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid request' }));
        return;
      }

      const result = auth.loginUser(data.email, data.password);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
    return;
  }

  if (pathname === '/api/update-profile' && req.method === 'POST') {
    parseRequestBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid request' }));
        return;
      }

      const { userId, ...updateData } = data;
      const result = auth.updateProfile(userId, updateData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
    return;
  }

  if (pathname === '/api/change-password' && req.method === 'POST') {
    parseRequestBody(req, (err, data) => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid request' }));
        return;
      }

      const result = auth.changePassword(data.userId, data.oldPassword, data.newPassword);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    });
    return;
  }

  // Serve static files
  let filePath = pathname;
  
  // Default to index.html for root path
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // Build file path - serve from root directory
  const fullPath = path.join(__dirname, filePath);
  
  // Get file extension
  const ext = path.extname(fullPath).toLowerCase();
  
  // Determine the MIME type
  const mimeType = mimeTypes[ext] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      // If file not found, return 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>', 'utf-8');
    } else {
      // Successful response
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});
