require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/store");

const jsonProducts = require("./products.json");

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("DB connected");

    await Product.deleteMany();
    await Product.create(jsonProducts);

    console.log("products added");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startApp();
