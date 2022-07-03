const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Username and password must be specified");
  }

  const date = new Date().getDate(); // for testing purpose

  const token = jwt.sign({ date, username }, process.env.JWT_TOKEN, {
    expiresIn: "2d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `random number is ${randomNumber}`,
  });
};

module.exports = { login, dashboard };
