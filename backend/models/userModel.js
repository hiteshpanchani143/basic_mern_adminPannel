const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
userModel.pre("save", async function (next) {
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
    next();
  } catch (error) {
    next(error);
  }
});

// jwt token
userModel.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = new mongoose.model("User", userModel);

module.exports = User;
