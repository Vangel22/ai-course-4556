const { bcrypt } = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const getByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (data) => {
  const newUser = new User(data);
  return await newUser.save();
};

const getAll = async () => {
  return await User.find();
};

module.exports = { getAll, getByEmail, create };
