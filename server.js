const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const multer = require("multer");
const NodeCache = require("node-cache");
const basicAuth = require("express-basic-auth");
const rateLimit = require("express-rate-limit");
const upload = require("./middlewares/multer");
const cache = require("./middlewares/cache");
const rateLimiter = require("./middlewares/rateLimiter");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const imageController = require("./controllers/imageController");
const logger = require("./utils/logger");

const app = express();

app.use(helmet()); // Security middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ADMIN_PASSWORD = "password";

app.use(
  "/optimize",
  basicAuth({
    users: { admin: ADMIN_PASSWORD },
    challenge: true,
  })
);

app.use(
  "/optimize",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage }).single("image");
app.use("/optimize", uploadMiddleware);

const myCache = new NodeCache();
const cacheMiddleware = (req, res, next) => {
  // Check cache logic here
  next();
};
app.use("/optimize", cacheMiddleware);

app.post("/optimize", imageController);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    logger.info(`Image optimization service running on port ${config.port}`);
  });
}

module.exports = app;
