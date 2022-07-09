require("dotenv").config();
const express = require("express");
const sequelize = require("./db/config/config");
const userRoutes = require("./routers/user");
require("./db/migrations/migration")

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection successfully established");

    // TODO: should not be synced here
    // await sequelize.sync({ alter: true });

    app.use("/api/v1/tutorial", userRoutes);

    app.listen(PORT, () => console.log(`Server started at -> ${PORT}`));
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

startApp();
