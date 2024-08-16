const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// hashPassword process before user create
userModel.pre("save", async function (bext) {
  const user = this;
  // if not modify password
  if (!user.isModified("password")) {
    next();
  }
  try {
    // if first time user create
    const saltRound = await bcrypt.genSalt(10); //
    const hashPassword = await bcrypt.hash(this.password, saltRound);
    user.password = hashPassword;
  } catch (error) {
    next();
  }
});

const User = new mongoose.model("User", userModel);

module.exports = User;
