const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Dùng cổng từ biến môi trường, nếu không có sẽ mặc định là 3000
const port = process.env.PORT || 3000;

app.use(cors()); // Cho phép tất cả các domain truy cập vào API của bạn

// Đường dẫn đến thư mục chứa video
const videosPath = path.join(__dirname, 'videos');

// API để lấy video ngẫu nhiên
app.get('/api/random-video', (req, res) => {
  // Đọc danh sách các file trong thư mục 'videos'
  fs.readdir(videosPath, (err, files) => {
    if (err) {
      // Nếu gặp lỗi khi đọc thư mục, trả về lỗi 500
      return res.status(500).json({ error: 'Không tìm thấy thư mục video' });
    }
    
    // Kiểm tra xem có file nào không
    if (files.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy video nào' });
    }

    // Lọc các file video với phần mở rộng '.mp4'
    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    if (videoFiles.length === 0) {
      // Nếu không có video '.mp4', trả về lỗi
      return res.status(404).json({ error: 'Không có video .mp4 nào' });
    }

    // Chọn một video ngẫu nhiên từ danh sách
    const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];

    // Kiểm tra môi trường và lấy URL video chính xác
    const videoURL = process.env.RENDER_URL 
      ? `${process.env.RENDER_URL}/videos/${randomVideo}` 
      : `${req.protocol}://${req.get('host')}/videos/${randomVideo}`;

    // Trả về đường dẫn video trong JSON
    res.json({ url: videoURL });
  });
});

// Dùng Express để phục vụ các video từ thư mục 'videos'
app.use('/videos', express.static(videosPath));

// Lắng nghe cổng để chạy API
app.listen(port, () => {
  console.log(`✅ API đang chạy tại cổng: ${port}`);
});