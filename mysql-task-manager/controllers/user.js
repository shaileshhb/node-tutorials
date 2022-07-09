const User = require("../db/model/user");

const getUsers = async (req, res) => {
  res.send("get users called");
};

module.exports = { getUsers };
