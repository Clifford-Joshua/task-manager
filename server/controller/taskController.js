const Task = require("../model/taskSchema");

const { StatusCodes } = require("http-status-codes");

const { BadRequestsError } = require("../errors");

const getTask = async (req, res) => {
  const tasks = await Task.find({});

  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
  const { dueDate } = req.body;
  const currentDate = new Date();
  const createdDate = new Date(dueDate);

  const task = await Task.create({ ...req.body });

  if (createdDate < currentDate) {
    throw new BadRequestsError("Due Date most be in the future");
  }

  res
    .status(StatusCodes.CREATED)
    .json({ task, success: true, msg: "New task created" });
};

const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ task, msg: "task updates successfully" });
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.deleteOne({ _id: taskId });
  res.status(StatusCodes.OK).json({ mgs: "task deleted successfully" });
};

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getSingleTask,
};
