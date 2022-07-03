const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandler = async (err, req, res, next) => {
  // console.log("err -> ", err);

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Something went wrong. Please try again later");
};

module.exports = errorHandler;
