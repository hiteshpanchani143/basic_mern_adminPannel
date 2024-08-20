const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const home = async (req, res) => {
  try {
    res.status(200).json({ message: "welcome to home page" });
  } catch (error) {
    console.log({ message: "error in home page", error: error.message });
  }
};

// Register User
const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({ message: "email already exits" });
    }

    // const saltRound = await bcrypt.genSalt(10)
    // const hashPassword =await bcrypt.hash(password,10); // you can directly write 10 salt

    // Note : hashPassword process in userModel.
    const user = await User.create({
      username,
      email,
      // password: hashPassword,
      password,
      phone,
    });
    res.status(201).json({
      message: "user create successfully",
      user,
      token: user.generateToken(),
      userId: user._id.toString(), // mongodb is store id as a object so we convert id as a string for easily manage other logic.
    });
  } catch (error) {
    // res.status(500).json({ message: "error in register", error: error.message });
    console.log("response from server");
    console.log(error);
    next(error);
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (!userExits) {
      return res.status(400).json({ message: "Invalid Credintials" });
    }
    // const validPassword = await bcrypt.compare(password, userExits.password); // normal flow
    const validPassword = await userExits.comparePassword(password); // userModel pre methods flow
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    } else {
      return res.status(200).json({
        message: "user login successfully.",
        token: await userExits.generateToken(),
        userId: userExits._id.toString(),
      });
    }
  } catch (error) {
    // return res.status(500).json({ message: "internal server error" });
    next(error);
  }
};

// Get User
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json(userData);
  } catch (error) {
    console.log(`error is user controller : ${error}`);
  }
};

module.exports = { home, register, login, user };
