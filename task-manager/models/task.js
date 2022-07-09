const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be specified"],
    trim: true,
    maxlength: [50, "name cannot be greater tha 20 characters"],
    // minlength: [1, "name cannot be empty"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
