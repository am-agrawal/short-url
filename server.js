// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Route for the homepage
  server.get('/', (req, res) => {
    return app.render(req, res, '/');
  });

  server.get('/404', (req, res) => {
    return app.render(req, res, '/404');
  });

  // Route for short URLs
  server.get('/:shortURL', (req, res) => {
    const { shortURL } = req.params;

    const urlMapping = {
      example: 'https://www.example.com',
    };

    const originalURL = urlMapping[shortURL];

    if (originalURL) {
      res.redirect(301, originalURL);
    } else {
      // app.render(req, res, '/404');
      res.redirect(301, 'https://www.example.com');
    }
  });

  // Fallback handler for all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
