const express = require("express");
const { getUsers, register, login } = require("../controllers/user");

const userRoutes = express.Router();

userRoutes.route("/user").get(getUsers);
userRoutes.route("/register").post(register);
userRoutes.route("/login").post(login);

module.exports = userRoutes;
