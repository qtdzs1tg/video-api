const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

const VIDEO_DIR = path.join(__dirname, 'videos');

app.use('/videos', express.static(VIDEO_DIR));

app.get('/api/random-video', (req, res) => {
  fs.readdir(VIDEO_DIR, (err, files) => {
    if (err || files.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy video nào.' });
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const fullUrl = `${req.protocol}://${req.get('host')}/videos/${randomFile}`;

    res.json({ url: fullUrl });
  });
});

app.get('/', (req, res) => {
  res.send(`<a href="/api/random-video">Nhận video ngẫu nhiên</a>`);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});