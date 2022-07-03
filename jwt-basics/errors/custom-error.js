class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

// const createCustomError = (message, statusCode) => {
//   return new CustomAPIError(message, statusCode);
// };

module.exports = CustomAPIError;
