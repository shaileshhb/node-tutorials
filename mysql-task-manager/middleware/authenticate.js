const jwt = require("jsonwebtoken");

const authenticateMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Token not provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_TOKEN,
      {
        algorithms: ["HS256"],
      },
      function (err, payload) {
        if (err) {
          throw err;
        }
        req.user = {
          userID: payload.userID,
          email: payload.email,
        };
        next();
      }
    );
    // const { date, username } = decoded;
    // req.user = { date, username };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = authenticateMiddleware;
