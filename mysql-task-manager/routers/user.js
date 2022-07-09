const express = require("express");
const { getUsers } = require("../controllers/user");

const userRoutes = express.Router();

userRoutes.route("/").get(getUsers);

module.exports = userRoutes;
