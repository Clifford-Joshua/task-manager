const { StatusCodes } = require("http-status-codes");
const customApiError = require("./customError");

class BadRequestError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
