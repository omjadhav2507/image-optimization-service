module.exports = {
  port: process.env.PORT || 3000,
  cacheTTL: 60 * 60 * 24,
  imageQuality: 80,
  maxWidth: 1920,
  formats: ["jpeg", "png", "webp"],
};
