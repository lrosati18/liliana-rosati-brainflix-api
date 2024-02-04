require("dotenv").config();
const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos.js");
const cors = require("cors");

app.use(express.static("public"));

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
