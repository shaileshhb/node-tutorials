const express = require("express");
const { register, login } = require("../controllers/user");
// const authenticateMiddleware = require("../middleware/authenticate")

const userRoutes = express.Router();

userRoutes.route("/register").post(register);
userRoutes.route("/login").post(login);

module.exports = userRoutes;
