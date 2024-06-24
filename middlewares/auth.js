const basicAuth = require("express-basic-auth");

module.exports = basicAuth({
  users: { admin: "password" }, // Hardcoded password for testing
  challenge: true,
});
