const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const FILE_PATH = "./data/videos.json";

const readVideos = (selectedParameters = false) => {
  const videosData = fs.readFileSync(FILE_PATH);
  const parseVideos = JSON.parse(videosData);

  // Only get some parameters
  if (selectedParameters) {
    return parseVideos.map((video) => ({
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    }));
  } else {
    return parseVideos;
  }
};

//GET videos
router.get("/videos", (req, res) => {
  const videosData = readVideos((selectedParameters = true));
  res.status(200).json(videosData);
});

//GET specific video
router.get("/videos/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const videosData = readVideos();
  const video = videosData.find((video) => video.id === videoId);

  if (video) {
    res.status(200).json(video);
  } else {
    res.status(404).send("Video not found");
  }
});

//POST new video
router.post("/upload", (req, res) => {
  const videoObj = req.body;
  const newVideo = {
    id: uuidv4(),
    title: videoObj.title,
    channel: "Channel",
    image: "./public/images/Upload-video-preview.jpg",
    description: videoObj.description,
    views: "1,000,000",
    likes: "100,000",
    duration: "11:11",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: 1626032763000,
    comments: [
      {
        id: uuidv4(),
        name: "Micheal Lyons",
        comment:
          "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
        likes: 0,
        timestamp: 1628522461000,
      },
      {
        id: uuidv4(),
        name: "Gary Wong",
        comment:
          "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        likes: 0,
        timestamp: 1626359541000,
      },
      {
        id: uuidv4(),
        name: "Theodore Duncan",
        comment:
          "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
        likes: 0,
        timestamp: 1626011132000,
      },
    ],
  };

  const videosData = readVideos();
  videosData.push(newVideo);
  fs.writeFileSync(FILE_PATH, JSON.stringify(videosData));

  res.status(201).json(newVideo);
});

module.exports = router;
