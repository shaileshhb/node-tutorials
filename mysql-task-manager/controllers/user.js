const User = require("../db/model/user");
const { createToken } = require("../middleware/token");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  res.send("get users called");
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        email: username,
      },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "username not found",
      });
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Invalid username or password",
      });
      return;
    }

    const token = createToken(user);
    res.status(StatusCodes.OK).json({ token });

  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
};

const register = async (req, res) => {
  try {
    const userBody = req.body;
    console.log(userBody);

    userBody.password = bcrypt.hashSync(userBody.password, 10);

    const user = await User.create(userBody);

    res.status(StatusCodes.ACCEPTED).json(null);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
};

module.exports = { getUsers, register, login };
