const mongoose = require("mongoose");

const conncetDB = (url) => {
  return mongoose.connect(url, {
    checkKeys: true
  });
  // , {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
  // }
};

module.exports = conncetDB;
