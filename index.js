const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const videosPath = path.join(__dirname, 'videos');

app.get('/api/random-video', (req, res) => {
  fs.readdir(videosPath, (err, files) => {
    if (err || files.length === 0) {
      return res.status(500).json({ error: 'Không tìm thấy video nào' });
    }

    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
    const videoURL = `${req.protocol}://${req.get('host')}/videos/${randomVideo}`;

    res.json({ url: videoURL });
  });
});

app.use('/videos', express.static(videosPath));

app.listen(port, () => {
  console.log(`✅ API đang chạy tại cổng: ${port}`);
});
