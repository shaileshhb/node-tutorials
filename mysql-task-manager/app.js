require("dotenv").config();
const express = require("express");
const sequelize = require("./db/config/config");
const userRoutes = require("./routers/user");

// TODO: need to know better way of migrating tables.
require("./db/migrations/migration")

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection successfully established");

    app.use(express.static("./public"));
    app.use(express.json());
    
    app.use("/api/v1/tutorial", userRoutes);

    app.listen(PORT, () => console.log(`Server started at -> ${PORT}`));
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

startApp();
