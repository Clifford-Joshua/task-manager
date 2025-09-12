const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleWare = (error, req, res, next) => {
  // console.log(error);

  let customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "something went wrong try again later",
  };

  // if it's a mongodb error
  if (error.name === "ValidationError") {
    customError.msg = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  // if it's a mongodb error for duplicate item/entry
  if (error.code && error.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (error.name === "CastError") {
    customError.msg = `No item found with id : ${error.value}`;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleWare;
