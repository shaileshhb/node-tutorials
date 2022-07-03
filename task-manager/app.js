const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const taskRoutes = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
require("dotenv").config();

const port = 3000;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startApp();
