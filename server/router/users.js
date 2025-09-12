const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authenticationMiddleware");

const {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  login,
} = require("../controller/userController");

router.route("/").get(getUsers);

router.route("/login").post(login);

router.route("/register").post(createUser);

router.route("/:id").patch(authentication, updateUser).delete(deleteUser);

module.exports = router;
