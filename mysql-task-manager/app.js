const sequelize = require("./db/connect")

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection successfully established");
  } catch (err) {
    console.error('Unable to connect to the database:', error);
  }
}

startApp()
