const NotFoundError = require("./notFound");
const BadRequestError = require("./badRequest");
const UnAuthorizeError = require("./unAuthorized");
const UnAuthenticatedError = require("./unAuthenticated");

module.exports = {
  NotFoundError,
  BadRequestError,
  UnAuthenticatedError,
  UnAuthorizeError,
};
