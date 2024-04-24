const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/loggingsinup")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const loggingsinupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String  // Use capital 'S' for String
  }
});

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const menuItemModel = mongoose.model("MenuItem", menuItemSchema);
const collection = mongoose.model("usercollection", loggingsinupSchema);
const postcreate = mongoose.model("post", postSchema);

module.exports = {
  collection,
  postcreate,
  menuItemModel
};


