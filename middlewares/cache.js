// middlewares/cache.js

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: require("../config").cacheTTL });

module.exports = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.send(cachedResponse);
  }

  res.sendResponse = res.send;
  res.send = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };
  next();
};
