const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Thư mục chứa video
const VIDEO_DIR = path.join(__dirname, 'videos');

// API trả về video ngẫu nhiên
app.get('/api/random-video', (req, res) => {
  fs.readdir(VIDEO_DIR, (err, files) => {
    if (err || files.length === 0) {
      return res.status(500).json({ error: 'Không tìm thấy video nào.' });
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const videoPath = `/videos/${randomFile}`;
    res.json({ url: videoPath });
  });
});

// Cho phép truy cập file tĩnh
app.use('/videos', express.static(VIDEO_DIR));

// Trang chủ test nhanh
app.get('/', (req, res) => {
  res.send(`<a href="/api/random-video">Lấy video ngẫu nhiên</a>`);
});

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});