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

    category: {
      type: String,
      default: "Others",
      enum: ["Personal", "Others"],
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
