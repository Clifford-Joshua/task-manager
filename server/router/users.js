const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authenticationMiddleware");

const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  login,
  forgottenPassword,
} = require("../controller/userController");

router.route("/").get(getUsers);

router.route("/login").post(login);

router.route("/register").post(createUser);

router.route("/forgotten-password").post(forgottenPassword);

router
  .route("/:id")
  .patch(authentication, updateUser)
  .delete(authentication, deleteUser);

module.exports = router;
