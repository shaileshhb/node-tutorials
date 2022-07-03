const mongoose = require("mongoose");


const conncetDB = (url) => {
  return mongoose.connect(url)
}

module.exports = conncetDB
