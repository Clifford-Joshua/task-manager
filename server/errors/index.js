const NotFoundError = require("./notFound");
const BadRequestsError = require("./badRequest");
const UnAuthorizeError = require("./unAuthorized");
const UnAuthenticatedError = require("./unAuthenticated");

module.exports = {
  NotFoundError,
  BadRequestsError,
  UnAuthenticatedError,
  UnAuthorizeError,
};
