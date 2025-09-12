const express = require("express");
const router = express.Router();

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

router.route("/:id").patch(updateUser).delete(deleteUser);

module.exports = router;
