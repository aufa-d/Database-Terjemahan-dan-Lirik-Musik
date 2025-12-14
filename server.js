const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// serve semua file statis (HTML, CSS, JS) dari folder project
app.use(express.static(__dirname));

// lokasi file index.json
const indexPath = path.join(__dirname, 'data', 'index.json');

// GET semua lagu
app.get('/api/index', (req, res) => {
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Gagal membaca index.json' });
    res.json(JSON.parse(data || '[]'));
  });
});

// POST overwrite index.json
app.post('/api/index', (req, res) => {
  const songs = req.body;
  fs.writeFile(indexPath, JSON.stringify(songs, null, 2), (err) => {
    if (err) return res.status(500).json({ error: 'Gagal menulis index.json' });
    res.json({ success: true });
  });
});

// route default ke index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});