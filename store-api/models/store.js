const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be specified"],
  },
  price: {
    type: Number,
    required: [true, "price must be specified"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    // enum: ["ikea", "liddy", "caressa", "marcos"],
  },
});

module.exports = mongoose.model("Product", storeSchema);
