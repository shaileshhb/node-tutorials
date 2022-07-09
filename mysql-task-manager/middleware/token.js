require("dotenv").config();
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      userID: user.id,
      email: user.email,
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

module.exports = { createToken };
