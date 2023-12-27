const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorized acccess");
  }

  const token = authHeaders.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized acccess");
  }
};

module.exports = auth;
