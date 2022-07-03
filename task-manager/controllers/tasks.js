const task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const singleTask = await task.findOne({ _id: taskID });

  if (!singleTask) {
    // const error = new Error("Not Found")
    // error.statusCode = 404
    
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task: singleTask });
});

const addTask = asyncWrapper(async (req, res) => {
  const createTask = await task.create(req.body);
  res.status(201).json({ createTask });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const data = req.body;

  const updatedTask = await task.findOneAndUpdate({ _id: taskID }, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    res.status(404).json({ msg: `No task with id: ${taskID}` });
    return;
  }
  res.status(200).json({ task: updatedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const deletedTask = await task.findOneAndDelete({ _id: taskID });

  if (!deletedTask) {
    res.status(404).json({ msg: `No task with id: ${taskID}` });
    return;
  }
  res.status(200).send();
});

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
