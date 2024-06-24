const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error(err.message, err);

  res.status(500).send({
    status: "error",
    message: "An unexpected error occurred. Please try again later.",
  });
};
