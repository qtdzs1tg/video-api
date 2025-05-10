const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const videosPath = path.join(__dirname, 'videos');

app.get('/api/qt-kurumi', (req, res) => {
  fs.readdir(videosPath, (err, files) => {
    if (err) return res.json({ url: null });

    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    
    if (videoFiles.length === 0) {
      return res.json({ url: null });
    }

    const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
    const videoURL = `${req.protocol}://${req.get('host')}/videos/${randomVideo}`;
    res.json({ url: videoURL });
  });
});

app.use('/videos', express.static(videosPath));

app.listen(port, () => {
    console.log(`✅ API đang chạy tại: http://localhost:${port}`);
  });