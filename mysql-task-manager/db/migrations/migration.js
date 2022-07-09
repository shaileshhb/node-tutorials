const User = require("../model/user");
const Task = require("../model/task");

const syncUser = async () => {
  try {
    User.hasMany(Task, {
      foreignKey: "userId",
      as: "users",
      onDelete: "CASCADE",
    });

    // await User.sync({ alter: true });
    // await Task.sync({ alter: true });

    console.log("Tables successfully migrated");
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

syncUser();

// module.exports = { syncUser };
