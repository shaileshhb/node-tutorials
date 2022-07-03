const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Token not provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const { date, username } = decoded;
    req.user = { date, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("route cannot be acccessed");
  }
};

module.exports = authenticationMiddleware;
