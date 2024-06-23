// server.js
const express = require("express");
const config = require("./config");
const upload = require("./middlewares/multer");
const cache = require("./middlewares/cache");
const imageController = require("./controllers/imageController");

const app = express();

app.post("/optimize", upload.single("image"), cache, imageController);

app.listen(config.port, () => {
  console.log(`Image optimization service running on port ${config.port}`);
});
