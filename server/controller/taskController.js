const Task = require("../model/taskSchema");
const User = require("../model/userSchema");

const { StatusCodes } = require("http-status-codes");

const { BadRequestError } = require("../errors");
const { default: mongoose } = require("mongoose");

const getTask = async (req, res) => {
  const tasks = await Task.find({
    $or: [{ createdBy: req.user.userId }, { assignedTo: req.user.userId }],
  })
    .populate("createdBy", "name") 
    .populate("assignedTo", "name")
    .sort("createdAt");

  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
  const { dueDate, executedBy, assignedTo } = req.body;
  const userID = req.user.userId;
  const currentDate = new Date();
  const createdDate = new Date(dueDate);

  if (executedBy === "others" && !assignedTo) {
    throw new BadRequestError("Please provide to whom the task is assigned");
  }

  if (executedBy === "others" && assignedTo) {
    const assignedUser = await User.findOne({ name: assignedTo });

    if (!assignedUser) {
      throw new BadRequestError("Assigned user does not exist");
    }

    req.body.assignedTo = assignedUser._id;
  } else {
    req.body.assignedTo = userID;
  }

  const task = await Task.create({ ...req.body, createdBy: userID });

  if (createdDate < currentDate) {
    throw new BadRequestError("Due Date most be in the future");
  }

  res
    .status(StatusCodes.CREATED)
    .json({ task, success: true, msg: "New task created" });
};

const updateTask = async (req, res) => {
  const userID = req.user.userId;
  const { id: taskId } = req.params;

  // using .lean() to return a plain JS object instead of a Mongoose document
  const updatingTask = await Task.findOne({ _id: taskId }).lean();
  const { assignedTo } = updatingTask;

  if (!updatingTask) {
    throw new BadRequestError(`No task with id : ${taskId}`);
  }

  if (assignedTo !== userID) {
    throw new BadRequestError("You are not authorized to update this task");
  }

  const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ task, msg: "task updates successfully" });
};

const deleteTask = async (req, res) => {
  const userID = req.user.userId;
  const { id: taskId } = req.params;

  // using .lean() to return a plain JS object instead of a Mongoose document
  const updatingTask = await Task.findOne({ _id: taskId }).lean();
  const { assignedTo } = updatingTask;

  if (!updatingTask) {
    throw new BadRequestError(`No task with id : ${taskId}`);
  }

  if (assignedTo !== userID) {
    throw new BadRequestError("You are not authorized to update this task");
  }

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
