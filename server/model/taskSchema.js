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
      maxlength: 1000,
      required: [true, "Please provided task description"],
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in progress", "completed"],
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
      type: String,
      // required: [
      //   function () {
      //     return this.executedBy === "others";
      //   },
      //   "Please provide to whom the task is assigned",
      // ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
