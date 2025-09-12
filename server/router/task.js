const express = require("express");
const router = express.Router();

const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
} = require("../controller/taskController");

router.route("/").get(getTask).post(createTask);
router.route("/:id").delete(deleteTask).patch(updateTask).get(getSingleTask);

module.exports = router;
