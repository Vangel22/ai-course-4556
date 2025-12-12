const mongoose = require("mongoose");

const init = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected!");
  } catch (err) {
    console.err("MongoDB connection error!");
    // process.exit(1);
  }
};

module.exports = { init };
