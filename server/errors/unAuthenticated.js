const customApiError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class UnAuthenticatedError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthenticatedError;
