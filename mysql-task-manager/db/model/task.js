const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Task = sequelize.define("task", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      max: 50,
    }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
});

module.exports = Task;
