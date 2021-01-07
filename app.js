const fs = require('fs');
const express = require('express');
const https = require('https');
const path = require('path');

const app = express();
const server = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '/localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, '/localhost.crt')),
}, app);

app.use('/a2hs', express.static(path.join(__dirname, 'a2hs'), {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  },
}));

server.listen(8080, () => console.log('PWA running at https://localhost:8080/a2hs'));
