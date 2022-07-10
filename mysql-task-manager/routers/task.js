const express = require("express");
const { addTask, markTaskComplete } = require("../controllers/task");
const authenticateMiddleware = require("../middleware/authenticate");

const taskRouter = express.Router();

taskRouter.route("/users/:userID/tasks").post(authenticateMiddleware, addTask);
taskRouter
  .route("/users/:userID/tasks/:taskID")
  .patch(authenticateMiddleware, markTaskComplete);

module.exports = taskRouter;
