require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const storeRoutes = require("./routes/store");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());

// setup routes
app.use("/api/v1/products", storeRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

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
