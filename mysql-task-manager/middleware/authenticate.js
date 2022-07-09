const jwt = require("jsonwebtoken");

const authenticateMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Token not provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const { date, username } = decoded;
    req.user = { date, username };
    next();
  } catch (error) {
    throw new Error("route cannot be acccessed");
  }
};
