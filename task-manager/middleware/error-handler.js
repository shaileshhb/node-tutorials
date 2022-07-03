const { CustomApiError } = require("../errors/custom-error");

const errorHandler = async (err, req, res, next) => {
  // console.log(err.message);

  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(500).json({ msg: err.message });
};

module.exports = errorHandler;
