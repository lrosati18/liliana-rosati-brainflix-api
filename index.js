require("dotenv").config();
const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos.js");
const cors = require("cors");

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors());
app.use(express.json());

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
