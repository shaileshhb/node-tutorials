const Task = require("../db/model/task");
const { StatusCodes } = require("http-status-codes");

const addTask = async (req, res) => {
  try {
    const taskBody = req.body;
    taskBody.userId = req.params.userID;
    // taskBody.user = {
    //   id: req.user.userID
    // }
    console.log(taskBody);
    console.log(req.user);

    await Task.create(taskBody);

    res.status(StatusCodes.ACCEPTED).json(null);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

const markTaskComplete = async (req, res) => {
  try {
    console.log(req.body);
    const { completed } = req.body;
    const { taskID: id } = req.params;

    Task.findByPk(id).then((task) => {
      console.log("findByPK response -> ", task);
      if (task) {
        task.update({
          completed: completed,
        }).then((response) => {
          // console.log("update response -> ", response);
          res.status(StatusCodes.ACCEPTED).json({task})
        }).catch((error) => {
          // res.status(StatusCodes.BAD_REQUEST).json({ error });
          throw error
        })
      }
    }).catch((error) => {
      throw error
    })
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

module.exports = { addTask, markTaskComplete };
