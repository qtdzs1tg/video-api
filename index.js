const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Lấy cổng từ môi trường hoặc sử dụng cổng 10000 nếu không có
const PORT = process.env.PORT || 10000;

const VIDEO_DIR = path.join(__dirname, 'videos');

// Cung cấp các video từ thư mục videos dưới dạng tĩnh
app.use('/videos', express.static(VIDEO_DIR));

// API để trả về video ngẫu nhiên
app.get('/api/random-video', (req, res) => {
  fs.readdir(VIDEO_DIR, (err, files) => {
    if (err || files.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy video nào trong thư mục videos.' });
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const fullUrl = `${req.protocol}://${req.get('host')}/videos/${randomFile}`;

    res.json({ url: fullUrl });
  });
});

// Trang chủ với liên kết tới API
app.get('/', (req, res) => {
  res.send('<a href="/api/random-video">Nhận video ngẫu nhiên</a>');
});

// Khởi động server và lắng nghe cổng được chỉ định
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});