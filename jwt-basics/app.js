require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// const connectDB = require("./db/connect");
const mainRoutes = require("./routes/jwt");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 3000;

const startApp = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    // console.log("DB connected");
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startApp();
