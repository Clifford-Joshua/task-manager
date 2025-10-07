const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 50,
      required: [true, "Please provided task title"],
    },
    description: {
      type: String,
      minlength: [15, "Please provide a description that adds your task"],
      maxlength: 1000,
      required: [true, "Please provide task description"],
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in progress", "completed", "rejected"],
    },
    dueDate: {
      type: Date,
      required: [true, "Please provided a due date"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
    executedBy: {
      type: String,
      default: "self",
      enum: ["self", "others"],
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
