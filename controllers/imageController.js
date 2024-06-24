const sharp = require("sharp");
const config = require("../config");
const logger = require("../utils/logger");

const optimizeImage = async (buffer, options) => {
  let image = sharp(buffer);

  if (options.width) {
    image = image.resize({ width: options.width });
  }

  image = image.toFormat(options.format, { quality: options.quality });

  return await image.toBuffer();
};

module.exports = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const format = req.query.format || "webp";
  const width = parseInt(req.query.width) || config.maxWidth;
  const quality = parseInt(req.query.quality) || config.imageQuality;

  if (!config.formats.includes(format)) {
    return res
      .status(400)
      .send(`Invalid format. Supported formats: ${config.formats.join(", ")}`);
  }

  try {
    const optimizedImage = await optimizeImage(req.file.buffer, {
      width,
      format,
      quality,
    });
    res.set("Content-Type", `image/${format}`);
    res.send(optimizedImage);
  } catch (error) {
    logger.error("Error optimizing image: %o", error);
    next(error);
  }
};
