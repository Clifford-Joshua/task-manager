const customApiError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class UnAuthorizeError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnAuthorizeError;
